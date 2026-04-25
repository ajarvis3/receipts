package com.hsareceipts.backend.service;

import com.hsareceipts.backend.config.StorageProps;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ReceiptStorageService {

    private final Path root;

    public ReceiptStorageService(StorageProps props) {
        this.root = Paths.get(props.receiptsDir());
    }

    public String store(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), root.resolve(filename));
        return filename;
    }

    public Resource load(String filename) {
        return new FileSystemResource(root.resolve(filename));
    }
}
