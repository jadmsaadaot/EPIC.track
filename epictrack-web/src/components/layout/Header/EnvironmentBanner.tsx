import React from "react";
import Box from "@mui/material/Box";
import { Palette } from "../../../styles/theme";
import { useAppDispatch } from "../../../hooks";
import { envBanner } from "../../../styles/uiStateSlice";

const EnvironmentBanner = () => {
  const dispatch = useAppDispatch();
  const host = window.location.hostname;
  const isTestEnvironment =
    host.indexOf("dev") !== -1 ||
    host.indexOf("test") !== -1 ||
    host.indexOf("demo") !== -1 ||
    host.indexOf("localhost") !== -1;
  dispatch(envBanner(isTestEnvironment));
  if (!isTestEnvironment) {
    return (
      <Box
        sx={{
          height: "0.5rem",
          background: Palette.secondary.main,
        }}
      ></Box>
    );
  }
  return (
    <Box
      sx={{
        backgroundColor: Palette.secondary.main,
        color: Palette.text.primary,
      }}
      textAlign="center"
    >
      You are using a TEST environment (<strong>{host}</strong>)
    </Box>
  );
};

export default EnvironmentBanner;
