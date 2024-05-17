import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import MainCard from "../cards/MainCard";
import {
  computeMaterialRequestStatus,
  convertStringToDate,
} from "./MaterialRequestList";
import { gray14, primaryGray } from "../../store/constant";
import { ReactElement } from "react";
import { RECEIVING_OPTIONS } from "./MaterialRequestForm";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PREFIX_IMAGE_URL } from "../../config";
import { ButtonCustom, GridFooter } from "../CustomizeComponent";
import { MATERIAL_REQUEST_URL } from "../../routes/Routes";
import { MaterialRequestDetailProps } from "../../hooks/useQueryMaterialRequestDetail";
import {
  MATERIAL_REQUEST_RECEIVING_METHOD,
  MATERIAL_REQUEST_STATUS,
} from "../../types/types";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const RequestLabel = ({
  label,
  value,
  chip,
}: {
  label: string;
  value?: string;
  chip?: ReactElement;
}) => {
  return (
    <Grid container md={12} pb="24px" alignItems="center" display="flex">
      <Grid item flex={1} xs={6} md={4} lg={3}>
        <Typography color={primaryGray}>{label}</Typography>
      </Grid>
      <Grid item flex={1}>
        {chip}
        {value && <Typography fontWeight="bold">{value}</Typography>}
      </Grid>
    </Grid>
  );
};

const MaterialRequestDetail = ({
  requestDetail,
}: {
  requestDetail: MaterialRequestDetailProps;
}) => {
  if (!requestDetail) return null;

  return (
    <Box>
      <Container sx={{ marginBottom: "24px" }} maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3} width="100%">
              <Grid item xs={12} md={9} flex={1}>
                <MainCard title="Request Information">
                  <RequestLabel
                    label="Request Date"
                    value={convertStringToDate(requestDetail.createdDate)}
                  />
                  <RequestLabel
                    label="Status"
                    chip={
                      computeMaterialRequestStatus(requestDetail.status) ||
                      undefined
                    }
                  />
                  <RequestLabel
                    label="Delivery Method"
                    value={
                      RECEIVING_OPTIONS.find(
                        (item) => item.id === requestDetail.receivingOption
                      )?.displayLabel
                    }
                  />

                  {requestDetail.receivingOption ===
                    MATERIAL_REQUEST_RECEIVING_METHOD.PICK_UP && (
                    <>
                      <RequestLabel
                        label="KH PRASAK Branch"
                        value={requestDetail.pickupBranch.name}
                      />
                      <RequestLabel
                        label="Branch Address"
                        value={requestDetail.pickupBranch.address}
                      />
                    </>
                  )}

                  {requestDetail.receivingOption ===
                    MATERIAL_REQUEST_RECEIVING_METHOD.DELIVERY && (
                    <RequestLabel
                      label="Delivery Location"
                      value={requestDetail.deliveryAddress}
                    />
                  )}
                  <RequestLabel
                    label="Business ID"
                    value={requestDetail.business.no}
                  />
                  <RequestLabel
                    label="Business Name"
                    value={requestDetail.business.name}
                  />
                  <RequestLabel label="Shop ID" value={requestDetail.shop.no} />
                  <RequestLabel
                    label="Shop Name"
                    value={requestDetail.shop.name}
                  />
                  <RequestLabel
                    label="Counter"
                    chip={
                      <Box display="flex" alignItems="center" gap="8px">
                        {requestDetail.counters.map((item) => {
                          return <Chip label={item.name} />;
                        })}
                      </Box>
                    }
                  />
                </MainCard>
              </Grid>
              <Grid item md={3}>
                <MainCard title="Requester Detail">
                  <Box
                    display="flex"
                    gap="8px"
                    flexDirection="column"
                    pb="24px"
                  >
                    <Typography
                      color={primaryGray}
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "4px",
                      }}
                    >
                      <PersonIcon color="inherit" fontSize="small" /> Requester
                      Name
                    </Typography>
                    <Typography fontWeight="bold">
                      {requestDetail.customer.fullName}
                    </Typography>
                  </Box>
                  <Box display="flex" gap="8px" flexDirection="column">
                    <Typography
                      color={primaryGray}
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "4px",
                      }}
                    >
                      <LocalPhoneIcon color="inherit" fontSize="small" />
                      Phone Number
                    </Typography>
                    <Typography fontWeight="bold">
                      {requestDetail.customer.phoneNumber}
                    </Typography>
                  </Box>
                </MainCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} width="100%">
              <Grid item xs={12} md={9} flex={1}>
                <MainCard title="Materials">
                  {requestDetail.counters.map((counter) => {
                    return (
                      <Accordion
                        sx={{
                          backgroundColor: gray14,
                          marginBottom: "16px",
                          boxShadow: "none",
                          borderRadius: "12px",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id={counter.id}
                        >
                          <Typography fontWeight="bold">
                            {counter.name} ( {counter.total} )
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            "& > div": {
                              borderBottom: "1px solid",
                              borderColor: gray14,
                              "&:last-child": {
                                border: 0,
                                paddingBottom: 0,
                                marginBottom: 0,
                              },
                            },
                          }}
                        >
                          {counter.materials.map((item) => {
                            return (
                              <Box mb="16px" pb="16px">
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="12px"
                                  >
                                    <Avatar
                                      variant="rounded"
                                      sx={{ width: "68px", height: "68px" }}
                                      sizes="10"
                                      src={`${PREFIX_IMAGE_URL}${item.image}`}
                                      alt={item.materialType}
                                    />
                                    {item.materialType}
                                  </Box>
                                  <Typography fontWeight="bold">
                                    x{item.amount}
                                  </Typography>
                                </Box>
                                {[
                                  MATERIAL_REQUEST_STATUS.PROCESSING,
                                  MATERIAL_REQUEST_STATUS.DELIVERING,
                                ].includes(requestDetail.status) && (
                                  <Box justifyContent="flex-end" display="flex">
                                    <ButtonCustom variant="orangeBtn">
                                      Print
                                    </ButtonCustom>
                                  </Box>
                                )}
                              </Box>
                            );
                          })}
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </MainCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <GridFooter gridSize={"formFooter"}>
        <div>
          <ButtonCustom
            href={MATERIAL_REQUEST_URL}
            variant="cancelBtn"
            buttonLabel="Cancel"
          />
        </div>
      </GridFooter>
    </Box>
  );
};

export default MaterialRequestDetail;
