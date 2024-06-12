import React, { useState } from 'react'
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Divider, ListItem, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";


const PUSListbox = ({items,handleClick1,selectedIndex}) => {
    const [open, setOpen] = useState([]);
     
   
    const handleClick = (id) => {
        setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }))

    };
 
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
                <Paper elevation={0} sx={{maxWidth:256 }} >
                    <ListItemText
                        sx={{ my: 0 ,mx:1}}
                        primary="PUS_SERVICES"
                        primaryTypographyProps={{
                            fontSize: 15,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Divider />
                    <List >
                        {items.map((item) => {
                            return (
                                <>
                                    <ListItemButton onClick={() => handleClick(item.id)} key={item.id}>
                                        <ListItemText primary={item.title} />
                                        {open[item.id] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.subMenu.map((subitem0) => {
                                                return (
                                                    <ListItemButton className="pl-3 mx-1" key={subitem0.id} selected={selectedIndex === subitem0.id} onClick={(event) => handleClick1(event,subitem0)}>
                                                        <ListItemText  primary={subitem0.title} />
                                                    </ListItemButton>
                                                )
                                            })
                                            }
                                        </List>
                                    </Collapse>
                                </>
                            );
                        })}
                    </List>
                </Paper>
            </ThemeProvider>
        </Box>

    )
}

export default PUSListbox;