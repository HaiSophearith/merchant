import React, { useMemo } from "react";
import {
  BreadCrumbContainer,
  ButtonCustom,
  EnabledLabel,
  GridContainer,
  GridFooter,
  InfoTypo,
  RoundedAvatar,
} from "../../../ui-component/CustomizeComponent";
import Breadcrumbs from "../../../ui-component/extended/Breadcrumbs";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import navigation from "../../../menu-items/index";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import useQueryBranch from "../../../hooks/useQueryBranch";
import { useParams } from "react-router-dom";
import { gridSpacing, lineGray } from "../../../store/constant";
import DefaultIcon from "../../../ui-component/DefaultIcon";
import BranchInfo from "./BranchInfo";
import { PREFIX_IMAGE_URL } from "../../../config";

const ViewBranchPage = () => {
  const { branchId } = useParams();
  const id = branchId as string;
  const { branch } = useQueryBranch({ branchId: id });

  const logoUrl = useMemo(() => {
    if (!!branch?.logoUrl) {
      return `${PREFIX_IMAGE_URL}${branch?.logoUrl}`;
    }
    return "";
  }, [branch?.logoUrl]);

  return (
    <>
      <BreadCrumbContainer>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />
      </BreadCrumbContainer>
      <Container maxWidth={false}>
        <GridContainer>
          <Grid container spacing={gridSpacing}>
            <Grid item sm={6} md={8}>
              <Box sx={{ paddingBottom: "24px" }}>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: "600",
                      marginRight: "15px",
                    }}
                  >
                    {branch?.name}
                  </Typography>
                  <EnabledLabel enabledLabel={branch?.enabled} />
                </Box>
                <InfoTypo>{branch?.branchCode}</InfoTypo>
              </Box>
              {branch && <BranchInfo branch={branch} />}
            </Grid>

            <Grid item sm={7} md={4}>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "500",
                  paddingBottom: "24px",
                }}
              >
                Branch Photo
              </Typography>

              <RoundedAvatar height="318px">
                <Avatar
                  variant="rounded"
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    width: "445px",
                    height: "278px",
                    backgroundColor: lineGray,
                  }}
                  src={logoUrl}
                >
                  {logoUrl === "" && <DefaultIcon />}
                </Avatar>
              </RoundedAvatar>
            </Grid>
          </Grid>
        </GridContainer>
      </Container>

      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <GridFooter gridSize="formFooter">
          <ButtonCustom variant="orangeBtn" buttonLabel="Edit" />
        </GridFooter>
      </Box>
    </>
  );
};

export default ViewBranchPage;
