import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  TableFooter,
  Typography,
} from "@mui/material";
import Breadcrumbs from "../../../../../ui-component/extended/Breadcrumbs";
import navigation from "../../../../../menu-items/index";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import {
  primaryDark,
  lineGray,
  gridSpacing,
  orangeMain,
  primaryLight,
  primaryGray,
  orange14,
} from "../../../../../store/constant";
import StaffListInViewBusiness from "../../../../../ui-component/listCollection/StaffListInViewBusiness";
import {
  BreadCrumbContainer,
  ButtonCustom,
  GridFileContainer,
  GridFooter,
  GridListContainer,
  GridStatus,
  EnabledLabel,
} from "../../../../../ui-component/CustomizeComponent";
import DefaultIcon from "../../../../../ui-component/DefaultIcon";
import { useParams } from "react-router-dom";
import ShopList from "../../../../../ui-component/listCollection/ShopList";
import { STATUS_LABEL, TableHeaderProps } from "../../../../../types/types";
import ReviewStatusModal from "../../../../../ui-component/modal/ReviewStatusModal";
import { useMemo, useState } from "react";
import useQueryShopsByBusiness from "../../../../../hooks/useQueryShopsByBusiness";
import useQueryBusinessDetail from "../../../../../hooks/useQueryBusinessDetail";
import useQueryEmployees from "../../../../../hooks/useQueryEmployees";
import useQueryInvitation from "../../../../../hooks/useQueryInvitation";
import useMutationReviewBusiness from "../../../../../hooks/useMutationReviewBusiness";
import MainCard from "../../../../../ui-component/cards/MainCard";
import capitalizeFirstCharacter from "../../../../../utils/convertStringToCapitalize";
import { PREFIX_IMAGE_URL } from "../../../../../config";
import useQueryGetReferralCode from "../../../../../hooks/useQueryReferralCode";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import { SHOP_CREATE_URL } from "../../../../../routes/Routes";
import { useNavigate } from "react-router-dom";

interface LabelShow {
  label: string;
}

const businessTypeLabels: Record<string, LabelShow> = {
  OFFICIAL_NAME: {
    label: "Office Name",
  },
  PREFERRED_NAME: {
    label: "Preferred Name",
  },
  SETTLEMENT_ACCOUNT_NAMEL: {
    label: "Settlement Account Name",
  },
};

const merchantTypeLabels: Record<string, LabelShow> = {
  CORPORATE: {
    label: "Corporate",
  },
  RETAILER: {
    label: "Retailer",
  },
};

const shopHeaders: TableHeaderProps[] = [
  {
    id: "Shop Name",
    label: "Shop Name",
    align: "left",
  },
  {
    id: "Shop Type",
    label: "Shop Type",
    align: "left",
  },
  {
    id: "Counter",
    label: "Counter",
    align: "left",
  },
  {
    id: "Review Status",
    label: "Review Status",
    align: "left",
  },
  {
    id: "Status",
    label: "Status",
    align: "left",
  },
  {
    id: "Action",
    label: "Action",
    align: "left",
  },
];

const ViewBusinessPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const businessId = String(id);
  const { eachBusiness: businessDetail } = useQueryBusinessDetail({
    businessId: businessId,
  });
  const [reviewStatus, setReviewStatus] = useState<STATUS_LABEL>();

  const { mutateAsync: reviewBusiness } = useMutationReviewBusiness();
  const { referral } = useQueryGetReferralCode(businessDetail?.referralCode!);

  const { invitations } = useQueryInvitation({
    businessId,
  });

  const { employees } = useQueryEmployees({
    businessId: businessId,
    employeeFilter: {
      limit: 10,
      pageNumber: 0,
    },
  });

  const { shopList } = useQueryShopsByBusiness({
    pageNumber: 0,
    limit: 5,
    businessId: businessId,
  });

  const handleReviewBusiness = (note: string) => {
    reviewBusiness({
      businessId,
      reviewProps: {
        note,
        status: reviewStatus,
      },
    });
    setOpen(false);
  };

  const businessInfos = useMemo(
    () => [
      { id: 1, label: "Owner Name", value: businessDetail?.name },
      {
        id: 2,
        label: "Business Type",
        value: businessTypeLabels?.[businessDetail?.nameType!]?.label!,
      },
      {
        id: 3,
        label: "Phone Number",
        value: businessDetail?.owner.phoneNumber,
      },
      {
        id: 4,
        label: "Merchant Type",
        value: merchantTypeLabels?.[businessDetail?.merchantType!]?.label!,
      },
      {
        id: 5,
        label: "Created Date",
        value: businessDetail?.createdDate,
      },
      { id: 6, label: "CIF", value: businessDetail?.owner.cbsCustId },
    ],
    [businessDetail]
  );

  const { creationDocuments } = useMemo(() => {
    const creationDocuments = businessDetail?.creationDocuments || [];
    return { creationDocuments };
  }, [businessDetail]);

  const { supportedDocuments } = useMemo(() => {
    const supportedDocuments = businessDetail?.supportedDocuments || [];
    return { supportedDocuments };
  }, [businessDetail]);

  const [open, setOpen] = useState<boolean>(false);

  const handleOnOpenReview = (status: STATUS_LABEL) => {
    setOpen(true);
    setReviewStatus(status);
  };

  const { statusLabel1, statusLabel2 } = useMemo(() => {
    let statusLabel1 = STATUS_LABEL.Unverified;
    let statusLabel2 = STATUS_LABEL.Verified;
    if (businessDetail?.status === STATUS_LABEL.Verified) {
      statusLabel1 = STATUS_LABEL.Escalated;
      statusLabel2 = STATUS_LABEL.Unverified;
    } else if (businessDetail?.status === STATUS_LABEL.Unverified) {
      statusLabel1 = STATUS_LABEL.Escalated;
      statusLabel2 = STATUS_LABEL.Verified;
    } else {
      statusLabel1 = STATUS_LABEL.Unverified;
      statusLabel2 = STATUS_LABEL.Verified;
    }
    return { statusLabel1, statusLabel2 };
  }, [businessDetail?.status]);

  const hanldeOnCloseReview = () => {
    setOpen(false);
  };

  const handleDownload = (fileUrl: string) => {
    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
      link.target = "_blank";
      link.rel = "noreferrer";
      link.click();
    }
  };

  return (
    <Box>
      <BreadCrumbContainer>
        <Breadcrumbs
          separator={FiberManualRecord}
          navigation={navigation}
          icon
          title
          rightAlign
        />
      </BreadCrumbContainer>
      {businessDetail && (
        <Box sx={{ padding: "0 24px" }}>
          <Grid container spacing={gridSpacing}>
            <Grid item sm={6} md={9}>
              <MainCard sx={{ mb: 3 }}>
                <Grid sx={{ display: "flex" }}>
                  <Grid
                    sx={{
                      border: "1px dashed",
                      borderColor: lineGray,
                      width: "120px",
                      height: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "120px",
                      margin: "0 20px 20px 0",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: "102px",
                        height: "102px",
                        backgroundColor: lineGray,
                      }}
                      src={`${PREFIX_IMAGE_URL}${businessDetail.logoUrl}`}
                    >
                      <DefaultIcon />
                    </Avatar>
                  </Grid>
                  <Grid>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pb: 1,
                      }}
                    >
                      <Typography sx={{ paddingRight: "12px" }} variant="h2">
                        {businessDetail?.name}
                      </Typography>
                      <EnabledLabel enabledLabel={businessDetail.enabled} />
                    </Box>
                    <Typography>{businessDetail?.no}</Typography>
                  </Grid>
                </Grid>

                {businessDetail && (
                  <Grid container spacing={2}>
                    {businessInfos.map((businessInfo, index) => {
                      return (
                        <Grid key={index} container item xs={12} md={6}>
                          <Grid item xs={12} sm={4}>
                            <Typography
                              sx={{
                                color: primaryGray,
                              }}
                            >
                              {businessInfo.label}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={8}>
                            <Typography
                              sx={{
                                color: primaryDark,
                              }}
                            >
                              {businessInfo.value}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}

                <Grid item md={12} xs={12}>
                  <Typography
                    sx={{
                      margin: "24px 0",
                      fontSize: "20px",
                      fontWeight: "500",
                      color: primaryDark,
                    }}
                  >
                    Referrer Informations
                  </Typography>
                </Grid>

                <Grid item md={12} xs={12}>
                  <Box
                    sx={{
                      padding: "24px",
                      background: "rgba(247, 247, 247, 0.97)",
                      borderRadius: "12px",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid container item xs={12} md={6}>
                        <Grid item xs={12} sm={5}>
                          <Typography
                            sx={{
                              color: primaryGray,
                            }}
                          >
                            Referrer Number
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                          <Typography
                            sx={{
                              color: primaryDark,
                            }}
                          >
                            {businessDetail.referralCode}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container item xs={12} md={6}>
                        <Grid item xs={12} sm={5}>
                          <Typography
                            sx={{
                              color: primaryGray,
                            }}
                          >
                            Position
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                          <Typography
                            sx={{
                              color: primaryDark,
                            }}
                          >
                            {referral?.position}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container item xs={12} md={6}>
                        <Grid item xs={12} sm={5}>
                          <Typography
                            sx={{
                              color: primaryGray,
                            }}
                          >
                            Referrer Name
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                          <Typography
                            sx={{
                              color: primaryDark,
                            }}
                          >
                            {referral?.name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container item xs={12} md={6}>
                        <Grid item xs={12} sm={5}>
                          <Typography
                            sx={{
                              color: primaryGray,
                            }}
                          >
                            Referrer Phone Number
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                          <Typography
                            sx={{
                              color: primaryDark,
                            }}
                          >
                            {referral?.phoneNumber}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </MainCard>

              <GridListContainer>
                <Grid
                  sx={{
                    padding: "24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alightItem: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: primaryDark,
                    }}
                  >
                    Shops
                  </Typography>

                  <ButtonCustom
                    variant="orangeBtn"
                    onClick={() =>
                      navigate(
                        SHOP_CREATE_URL.replace(":businessId", businessId)
                      )
                    }
                    buttonLabel="Quick Create Shop"
                  />
                </Grid>

                <ShopList
                  tableHeaders={shopHeaders}
                  isExpandable={false}
                  shopList={shopList}
                />
                <TableFooter
                  component="div"
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button>
                    <Link sx={{ color: primaryDark }} underline="none" href="#">
                      View All
                    </Link>
                    <IconButton>
                      <ChevronRightIcon />
                    </IconButton>
                  </Button>
                </TableFooter>
              </GridListContainer>

              <GridListContainer>
                <Grid
                  sx={{
                    padding: "24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alightItem: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: primaryDark,
                    }}
                  >
                    Staff
                  </Typography>
                </Grid>
                <Box>
                  {StaffListInViewBusiness.length > 0 && (
                    <StaffListInViewBusiness staffList={employees} />
                  )}
                </Box>

                <TableFooter
                  component="div"
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button sx={{ color: primaryDark }}>
                    View All
                    <IconButton>
                      <ChevronRightIcon />
                    </IconButton>
                  </Button>
                </TableFooter>
              </GridListContainer>
            </Grid>

            <Grid item sm={7} md={3} columnGap={2}>
              <MainCard title="Review Status">
                <GridStatus>
                  <Typography>Status Type</Typography>
                  <Typography sx={{ color: orangeMain }}>
                    {capitalizeFirstCharacter(businessDetail?.status)}
                  </Typography>
                </GridStatus>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 2,
                  }}
                >
                  <Button
                    sx={{
                      padding: "8px 12px",
                      bgcolor: "#333",
                      borderRadius: "12px",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#333",
                      },
                      minWidth: "100px",
                    }}
                    onClick={() => handleOnOpenReview(statusLabel1)}
                  >
                    {capitalizeFirstCharacter(statusLabel1)}
                  </Button>
                  <Button
                    sx={{
                      bgcolor: orangeMain,
                      color: "#000",
                      borderRadius: "10px",
                      minWidth: "100px",
                      " &:hover": {
                        backgroundColor: primaryGray,
                      },
                    }}
                    onClick={() => handleOnOpenReview(statusLabel2)}
                  >
                    {capitalizeFirstCharacter(statusLabel2)}
                  </Button>
                </Box>
              </MainCard>

              {supportedDocuments.length > 0 && (
                <MainCard title="Business Supported Documents" sx={{ mt: 3 }}>
                  {supportedDocuments.map((file) => {
                    return (
                      <>
                        <Box
                          key={file.url}
                          sx={{
                            display: "flex",
                            width: "100%",
                            padding: "10px",
                            borderRadius: "10px",
                            margin: "10px 0 10px 0",
                            border: "1px solid #E3E3E3",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexGrow: 1,
                            }}
                          >
                            <DescriptionTwoToneIcon
                              sx={{ marginRight: "10px" }}
                            />
                            <div>{file.url}</div>
                          </Box>
                          <IconButton
                            onClick={() =>
                              handleDownload(`${PREFIX_IMAGE_URL}${file.url}`)
                            }
                          >
                            <FileDownloadOutlinedIcon />
                          </IconButton>
                        </Box>
                      </>
                    );
                  })}
                </MainCard>
              )}

              {creationDocuments.length > 0 && (
                <Grid
                  sx={{
                    border: "0.5px solid",
                    borderColor: lineGray,
                    backgroundColor: primaryLight,
                    borderRadius: "12px",
                    padding: "24px",
                    marginTop: "24px",
                  }}
                >
                  <Typography sx={{ padding: "12px 0" }} variant="h2">
                    Business Creation <br /> Documents
                  </Typography>

                  {creationDocuments.map((businessCreationDoc) => {
                    if (!businessCreationDoc) return null;
                    return (
                      <GridFileContainer>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              sx={{ width: "30px", height: "30px" }}
                              variant="rounded"
                            >
                              <UploadFileIcon />
                            </Avatar>
                            <Box
                              sx={{
                                marginLeft: "15px",
                              }}
                            >
                              <Typography variant="h6">
                                {businessCreationDoc.url}
                              </Typography>
                            </Box>
                          </Box>
                          <Box>
                            <FileDownloadDoneIcon />
                          </Box>
                        </Box>
                      </GridFileContainer>
                    );
                  })}
                </Grid>
              )}

              {invitations.lenght > 0 && (
                <Grid
                  sx={{
                    border: "0.5px solid",
                    borderColor: lineGray,
                    backgroundColor: primaryLight,
                    borderRadius: "12px",
                    padding: "24px 24px 0 24px",
                    marginTop: "24px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alightItem: "center",
                    }}
                  >
                    <Typography variant="h2">Pending Invitation </Typography>
                    <Typography
                      sx={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "10px",
                        backgroundColor: orange14,
                        color: orangeMain,
                      }}
                    >
                      20
                    </Typography>
                  </Box>

                  <Grid>
                    {invitations.map((invitation: any) => {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            margin: "30px 0",
                          }}
                        >
                          <Avatar
                            sx={{
                              width: "80px",
                              height: "80px",
                            }}
                            alt="Pending profile"
                            src={invitation.profile}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Box>
                              <Typography
                                variant="h4"
                                sx={{ color: primaryDark }}
                              >
                                {invitation.name}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alightItem: "center",
                                }}
                              >
                                <Typography sx={{ color: primaryGray }}>
                                  {`Shop ${invitation.labels.shop}`}
                                </Typography>
                                {invitation.position === "Cashier" && (
                                  <Box sx={{ display: "flex" }}>
                                    <FiberManualRecord
                                      sx={{
                                        width: "10px",
                                        m: "0 10px",
                                        color: lineGray,
                                      }}
                                    />
                                    <Typography>
                                      {`Counter ${invitation.labels.counter}`}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            </Box>
                            <Box>
                              <Typography
                                variant="h4"
                                sx={{ color: orangeMain }}
                              >
                                {invitation.position}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                    <Box
                      sx={{
                        borderTop: "2px solid",
                        borderColor: lineGray,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        sx={{
                          color: primaryDark,
                        }}
                      >
                        View All
                        <IconButton>
                          <ChevronRightIcon />
                        </IconButton>
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      )}

      <GridFooter gridSize="large">
        <ButtonCustom variant="blackBtn" buttonLabel="Adit Log">
          <IconButton sx={{ color: primaryLight }}>
            <FileOpenIcon />
          </IconButton>
        </ButtonCustom>
        <ButtonCustom variant="orangeBtn" buttonLabel="Edit" />
      </GridFooter>

      <ReviewStatusModal
        open={open}
        handleOnConfirm={handleReviewBusiness}
        handleOnCancel={hanldeOnCloseReview}
      />
    </Box>
  );
};
export default ViewBusinessPage;
