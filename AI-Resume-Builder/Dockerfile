# Base image with Java (e.g., OpenJDK 21)
FROM openjdk:21-jdk-slim

# Set environment variables
ENV LANG=C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

# Install LaTeX and necessary packages
RUN apt-get update && apt-get install -y \
    texlive \
    texlive-latex-extra \
    texlive-fonts-recommended \
    texlive-xetex \
    texlive-fonts-extra \
    build-essential \
    libpq-dev \
    gcc \
    python3-dev \
    libjpeg-dev \
    zlib1g-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy the Spring Boot jar (adjust the filename accordingly)
COPY target/AI-Resume-Builder-0.0.1-SNAPSHOT.jar app.jar

# Expose the port (adjust if needed)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
