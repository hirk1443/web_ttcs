package com.ptit.coffee_shop.common.enums;

public enum DocumentStatusEnum {
    PENDING, APPROVED, REJECTED;

    public static DocumentStatusEnum fromString(String value) {
        for (DocumentStatusEnum status : DocumentStatusEnum.values()) {
            if (status.name().equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid status: " + value);
    }
}
