import { Box, Button } from "@mui/material";

export interface menuOptions {
  onPress: () => void;
  backgroundColor: string;
  text: string;
}

interface MenuBarProps {
  menuOptions: menuOptions[];
}

export const MenuBarLocal = ({menuOptions}: MenuBarProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, margin: 2 }}>
      {menuOptions.map((option) => (
        <Button
        key={option.text}
          variant="outlined"
          onClick={option.onPress}
          style={{ background: option.backgroundColor }}
        >
          {option.text}
        </Button>
      ))}
    </Box>
  );
};
