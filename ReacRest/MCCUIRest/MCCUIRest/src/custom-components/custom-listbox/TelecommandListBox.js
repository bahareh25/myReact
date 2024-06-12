import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";
import { Divider, Grid } from "@mui/material";


const style = 
  
    {
      bgcolor: open ? "rgba(71, 98, 100, 0.2)" : null,
      pb: open ? 2 : 0,
    };
    const typography={
      fontSize: 15,
      fontWeight: "medium",
      lineHeight: "20px",
      mb: "2px",
    }


const TelecommandListBox = ({telList ,handleTelClick,selectedIndex }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper elevation={0} sx={{maxWidth:300 }}>
         {/*  <Box
            sx={style}
          > */}
           <ListItemText
                        sx={{ my: 0 ,mx:1}}
                        primary="Telecommand_List"
                        primaryTypographyProps={{
                            fontSize: 15,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Divider />
             { telList.map((item,index) => (
                <ListItemButton
                  key={index}
                  sx={{ py:0, minHeight: 32, color: "rgba(255,255,255,.8)" }} selected={selectedIndex === index} onClick={(event) => handleTelClick(event,index)}
                >
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </ListItemButton>
              ))}
          {/* </Box> */}
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
export default TelecommandListBox;