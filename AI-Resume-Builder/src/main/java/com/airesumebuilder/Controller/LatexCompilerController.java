package com.airesumebuilder.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class LatexCompilerController {

    private static final Logger logger = LoggerFactory.getLogger(LatexCompilerController.class);

    @PostMapping("/compile")
    public ResponseEntity<byte[]> compileLatex(@RequestBody Map<String, String> payload) {
        String code = payload.getOrDefault("code", "");

        String tmpId = UUID.randomUUID().toString();
        Path texPath = Path.of(System.getProperty("java.io.tmpdir"), tmpId + ".tex");
        Path pdfPath = Path.of(System.getProperty("java.io.tmpdir"), tmpId + ".pdf");

        try {
            // Write LaTeX code to .tex file
            Files.writeString(texPath, code);

            // Run pdflatex command to compile
            ProcessBuilder pb = new ProcessBuilder(
                    "pdflatex",
                    "-output-directory", System.getProperty("java.io.tmpdir"),
                    texPath.toString()
            );
            pb.redirectErrorStream(true);
            Process process = pb.start();

            // Print compiler output (for debugging)
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                reader.lines().forEach(logger::info);
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                logger.error("Compilation failed with exit code: {}", exitCode);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Compilation error".getBytes());
            }

            // Read the generated PDF file
            byte[] pdfBytes = Files.readAllBytes(pdfPath);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("inline", tmpId + ".pdf");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (IOException | InterruptedException e) {
            logger.error("Error during LaTeX compilation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Server error: " + e.getMessage()).getBytes());
        } finally {
            // Clean up temporary files
            try {
                Files.deleteIfExists(texPath);
                Files.deleteIfExists(pdfPath);
            } catch (IOException ignored) {
                logger.warn("Error cleaning up temporary files");
            }
        }
    }
}

@Configuration
class CorsGlobalConfig {

    private static final Logger logger = LoggerFactory.getLogger(CorsGlobalConfig.class);

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                logger.info("Configuring CORS for frontend URL: {}", frontendUrl);
                registry.addMapping("/**")
                        .allowedOrigins(frontendUrl)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
