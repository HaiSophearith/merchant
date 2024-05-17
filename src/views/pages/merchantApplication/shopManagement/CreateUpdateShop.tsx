import React, { useState } from "react";
import { ErrorInfo, RequestShopProps } from "../../../../types/types";
import useMutationCreateShop from "../../../../hooks/useMutationCreateShop";
import ShopForm from "./ShopForm";
import useQueryBusinessDetail from "../../../../hooks/useQueryBusinessDetail";
import useQueryShopTypes from "../../../../hooks/useQueryShopTypes";
import useMutationUpdateShop from "../../../../hooks/useMutationUpdateShop";
import useQueryAccountNumbers from "../../../../hooks/useQueryAccountNumbers";
import useQueryShop from "../../../../hooks/useQueryShop";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import SuccessDialog from "../../../../ui-component/modal/SuccessDialog";
import ErrorDialog from "../../../../ui-component/modal/ErrorDialog";
import ConfirmModal from "../../../../ui-component/modal/ConfirmModal";
import { alertDuration } from "../../../../store/constant";
import { VIEW_SHOP } from "../../../../routes/Routes";

const CreateUpdateShop = ({
  businessId,
  shopId,
}: {
  businessId: string;
  shopId?: string;
}) => {
  const navigate = useNavigate();
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openConfirmEditDialog, setOpenConfirmEditDialog] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { mutateAsync: createShop } = useMutationCreateShop();
  const { mutateAsync: updateShop } = useMutationUpdateShop();
  const { shop, status } = useQueryShop({
    businessId: businessId!,
    shopId: shopId!,
  });
  const { bankAccountNumbers } = useQueryAccountNumbers({
    businessId,
  });

  const { eachBusiness } = useQueryBusinessDetail({
    businessId: businessId!,
  });

  const { shopTypes } = useQueryShopTypes();

  const handleErrorDialog = () => {
    setOpenErrorDialog(!openErrorDialog);
    setTimeout(() => {
      setOpenErrorDialog(false);
    }, alertDuration);
  };

  const handleSuccessDialog = () => {
    setOpenSuccessDialog(!openSuccessDialog);
    setTimeout(() => {
      setOpenSuccessDialog(false);
      navigate(VIEW_SHOP.replace(":businessId", businessId));
    }, alertDuration);
  };

  const handleCancelConfirmEdit = () => {
    setOpenConfirmEditDialog(false);
  };

  const handleConfirmEdit = () => {
    setOpenConfirmEditDialog(false);
    handleSuccessDialog();
  };

  const handleOnSubmit = async (shop: RequestShopProps) => {
    try {
      if (!!shopId) {
        await updateShop({
          businessId: businessId,
          shopId: shopId!,
          updateShopVariables: shop,
        });
        setOpenConfirmEditDialog(!openConfirmEditDialog);
      } else {
        await createShop({
          businessId: businessId!,
          createShopVariables: shop,
        });
        handleSuccessDialog();
      }
    } catch (e) {
      const error = e as AxiosError<ErrorInfo>;
      setErrorMessage(error.response?.data.reason as string);
      handleErrorDialog();
    }
  };

  return (
    <>
      {status === "success" && (
        <ShopForm
          onSubmit={handleOnSubmit}
          shopTypes={shopTypes}
          bankAccounts={bankAccountNumbers}
          initialShop={shop}
          business={eachBusiness}
        />
      )}
      {status === "loading" && (
        <ShopForm
          onSubmit={handleOnSubmit}
          shopTypes={shopTypes}
          bankAccounts={bankAccountNumbers}
          initialShop={shop}
          business={eachBusiness}
        />
      )}

      <SuccessDialog
        open={openSuccessDialog}
        message={shopId ? "Edit Successfully!" : "Create Successfully!"}
      />
      <ErrorDialog open={openErrorDialog} message={errorMessage} />

      <ConfirmModal
        handleOnCancel={handleCancelConfirmEdit}
        handleOnConfirm={handleConfirmEdit}
        open={openConfirmEditDialog}
        description="Are you sure you want to update this record?"
      />
    </>
  );
};
export default CreateUpdateShop;
