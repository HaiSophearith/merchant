// project imports
import { Theme } from "@mui/material/styles";
import {
  lineGray,
  orangeMain,
  primaryGray,
  primaryLight,
} from "../store/constant";

export default function componentStyleOverrides(
  theme: Theme,
  borderRadius: number,
  outlinedFilled: boolean
) {
  const mode = theme.palette.mode;
  const bgColor =
    mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[50];
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: outlinedFilled ? bgColor : "transparent",
          borderRadius: `${borderRadius}px`,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: lineGray,
          },
          "&.MuiInputBase-multiline": {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: outlinedFilled ? bgColor : "transparent",
          padding: "15.5px 14px",
          "&.MuiInputBase-inputSizeSmall": {
            padding: "10px 14px",
            "&.MuiInputBase-inputAdornedStart": {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: "12px",
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color:
              mode === "dark"
                ? theme.palette.text.primary + 50
                : theme.palette.grey[300],
          },
        },
        mark: {
          backgroundColor: theme.palette.background.paper,
          width: "4px",
        },
        valueLabel: {
          color:
            mode === "dark"
              ? theme.palette.primary.main
              : theme.palette.primary.light,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiAutocomplete-tag": {
            background:
              mode === "dark"
                ? theme.palette.text.primary + 20
                : theme.palette.secondary.light,
            borderRadius: 4,
            color: theme.palette.text,
          },
        },
        popper: {
          borderRadius: `${borderRadius}px`,
          boxShadow:
            "0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.divider,
          opacity: mode === "dark" ? 0.2 : 1,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&.MuiChip-deletable .MuiChip-deleteIcon": {
            color: "inherit",
          },
        },
      },
    },
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          color: theme.palette.text,
          fontSize: "16px",
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        label: {
          marginTop: 14,
          marginBottom: 14,
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiInternalDateTimePickerTabs: {
      styleOverrides: {
        tabs: {
          backgroundColor:
            mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.primary.light,
          "& .MuiTab-root": {
            color:
              mode === "dark"
                ? theme.palette.text.secondary
                : theme.palette.grey[900],
          },
          "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.primary.dark,
          },
          "& .Mui-selected": {
            color: theme.palette.primary.dark,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          borderBottom: "1px solid",
          borderColor:
            mode === "dark"
              ? theme.palette.text.primary + 20
              : theme.palette.grey[200],
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: "12px 0 12px 0",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor:
            mode === "dark"
              ? theme.palette.text.primary + 15
              : theme.palette.grey[200],
          "&.MuiTableCell-head": {
            fontSize: "0.875rem",
            color:
              mode === "dark"
                ? theme.palette.grey[600]
                : theme.palette.grey[900],
            fontWeight: 500,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.background.paper,
          background: theme.palette.text.primary,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.25rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          "& label.Mui-focused": {
            color: orangeMain,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "12px",
            },
            "&.Mui-focused fieldset": {
              border: "1.5px solid",
              borderColor: orangeMain,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: orangeMain,
          },
        },
        select: {},
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.MuiInputLabel-shrink": {
            color: primaryGray,
          },
          "&.Mui-focused": {
            color: orangeMain,
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: {
          width: "42px",
          height: "26px",
          padding: "0",
          "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: 2,
            "&.Mui-checked": {
              transform: "translateX(16px)",
              color: primaryLight,
              "& + .MuiSwitch-track": {
                backgroundColor: orangeMain,
                opacity: 1,
                border: 0,
              },
            },
          },
          "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 22,
            height: 22,
          },
          "& .MuiSwitch-track": {
            borderRadius: 13,
            backgroundColor: lineGray,
            opacity: 1,
          },
        },
      },
    },
  };
}
