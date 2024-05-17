import { Box, Grid, IconButton, Typography } from "@mui/material";
import { primaryLight } from "../../../../store/constant";
import { CounterProps } from "../../../../types/types";
import EyeIcon from "../../../../ui-component/EyeIcon";
import EditIcon from "../../../../ui-component/EditIcon";
import DeleteIcon from "../../../../ui-component/DeleteIcon";
import { useNavigate, useParams } from "react-router-dom";
import useMutationDeleteCounter from "../../../../hooks/useMutationDeleteCounter";
import DeleteModal from "../../../../ui-component/modal/DeleteModal";
import { useState } from "react";
import {
  COUNTER_DETAIL_URL,
  COUNTER_UPDATE_URL,
} from "../../../../routes/Routes";

interface CountersProp {
  isExpandable: boolean;
  shopId: string;
  counters: CounterProps[];
}

const ViewCounters = ({ counters, shopId, isExpandable }: CountersProp) => {
  const { businessId } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [counterId, setCounterId] = useState<string | null>(null);

  const {
    mutateAsync: deleteCounter,
    status,
    error,
  } = useMutationDeleteCounter();
  console.log("status", status);
  console.log("error", error);

  const handleDelete = (id: string) => {
    setOpen(true);
    setCounterId(id);
  };

  const handleCancel = () => {
    setOpen(false);
    setCounterId(null);
  };

  const handleConfirm = () => {
    if (!counterId) return;
    deleteCounter({ counterId: counterId, shopId });
    setOpen(false);
    setCounterId(null);
  };

  return (
    <>
      {counters.map((counter) => {
        return (
          <Grid
            sx={{
              marginTop: "12px",
              background: primaryLight,
              border: "none",
              borderRadius: "12px",
              padding: "14px 22px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 155px 0 120px",
              }}
            >
              <Typography>{counter.name}</Typography>
              {isExpandable && (
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <IconButton
                    onClick={() =>
                      navigate(
                        COUNTER_DETAIL_URL.replace(
                          ":businessId",
                          businessId as string
                        )
                          .replace(":shopId", shopId as string)
                          .replace(":counterId", counter.id as string)
                      )
                    }
                  >
                    <EyeIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      navigate(
                        COUNTER_UPDATE_URL.replace(
                          ":businessId",
                          businessId as string
                        )
                          .replace(":shopId", shopId as string)
                          .replace(":counterId", counter.id as string)
                      )
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(counter.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Grid>
        );
      })}
      <DeleteModal
        open={open}
        description="Are you sure you want to delete this counter?"
        handleOnCancel={handleCancel}
        handleOnConfirm={handleConfirm}
      />
    </>
  );
};

export default ViewCounters;
