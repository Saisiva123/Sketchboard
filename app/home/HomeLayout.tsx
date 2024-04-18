"use client"

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
    Badge,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Modal,
    Tooltip,
    Typography,
} from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import logo from "../../public/logo.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import '@/app/globals.css';
import { SnackbarProvider } from "@/utils/snackbar.provider";
import BasicSelect from "@/components/Select";


const HomeLayout: React.FC<any> = ({ children }: { isShared: boolean, children: any }) => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorNotEl, setAnchorNotEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const notificationOpen = Boolean(anchorNotEl);

    const [connectedUsers, setConnectedUsers] = useState<any>();
    const [showBadge, setShowBadge] = useState<boolean>(true)
    const searchParams = useSearchParams();
    const [popupOpen, setPopupOpen] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (forType?: string) => {
        forType === "logout" && logout();
        setAnchorEl(null);
    };

    const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
        setShowBadge(true)
        setAnchorNotEl(event.currentTarget);
    };

    const handleNotificationClose = (forType?: string) => {
        forType === "logout" && logout();
        setAnchorNotEl(null);
    };

    const handlePopupClose = () => { setPopupOpen(false) };
    
    const sendInvitation = () => {
        setPopupOpen(true);
        handleClose()
    }

    const logout = () => {
        Cookies.remove('token', { path: '/' });
        Cookies.remove('email', { path: '/' });
        router.push("/login");
    };



    return (
        <SnackbarProvider>
            <div className="home"
            >
                <div className="header p-2 px-4 flex justify-between items-center">
                    <Image src={logo} width={110} alt="Picture of the author" />

                    <div className="flex jusfity-between gap-5 items-center">
                        <span className="search relative">
                            <input
                                type="text"
                                placeholder="Search or type a command (Ctrl + G)"
                            />
                        </span>
                     <Tooltip title="Notifications">
                            <Badge badgeContent=" " color="primary" variant="dot" invisible={showBadge}>
                                <IconButton
                                    className="profileIconBtn"
                                    onClick={handleNotificationClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={notificationOpen ? "notification-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={notificationOpen ? "true" : undefined}
                                >
                                    <NotificationsNoneIcon sx={{ color: "grey" }} />
                                </IconButton>
                            </Badge>
                        </Tooltip>


                        <Tooltip title="Account settings">
                            <IconButton
                                className="profileIconBtn"
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? "account-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                            >
                                <div className="profilePic"></div>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={() => handleClose()}
                            onClick={() => handleClose()}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    "&::before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform: "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <MenuItem onClick={() => handleClose()} className="block">
                                <p className="font-semibold text-sm m-0">Email Address:</p>
                                <p className="font-medium text-xs m-0">{Cookies.get('email')}</p>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => sendInvitation()}>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                <p className="font-medium text-sm m-0">Send an Invitation</p>
                            </MenuItem>
                            <MenuItem onClick={() => handleClose()}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                <p className="font-medium text-sm m-0">Settings</p>
                            </MenuItem>
                            <MenuItem onClick={() => handleClose("logout")}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                <p className="font-medium text-sm m-0">Logout</p>
                            </MenuItem>
                        </Menu>
                        <Menu
                            anchorEl={anchorNotEl}
                            id="notification-menu"
                            open={notificationOpen}
                            onClose={() => handleNotificationClose()}
                            onClick={() => handleNotificationClose()}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    "&::before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform: "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            {connectedUsers?.length ? connectedUsers.map(({ color, username }: any, index: number) => {
                                return (
                                    <>
                                        <MenuItem className="block">
                                            <p className={`font-medium text-xs m-0 text-${color}`}>{username} joined the room.</p>
                                        </MenuItem>
                                        {index != connectedUsers?.length - 1 ? <Divider /> : <></>}
                                    </>
                                )
                            }) : <MenuItem className="block">
                                <p className={`font-medium text-xs m-0`}>Empty Notifications.</p>
                            </MenuItem>}
                        </Menu>
                    </div>
                </div>

                {/* Modal popup for Invitation */}
                <Modal
                    open={popupOpen}
                    onClose={handlePopupClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="accountSelection">
                        <BasicSelect handlePopupclose = {handlePopupClose}/>
                    </div>


                </Modal>
                <div className="body px-3"> {children} </div>
            </div>
        </SnackbarProvider>
    )
}

export default HomeLayout