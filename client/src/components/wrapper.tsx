import { Box } from '@chakra-ui/react';
import React from 'react'

interface WrapperProps {
    children: React.ReactNode;
    variant?: "small" | "regular"
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
    return (
        <Box p={35} mt={8} mx='auto' maxW={variant === "regular" ? "900px" : "400px"} w="100%">
            {children}
        </Box>
    );
}