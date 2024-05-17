import React, { useState } from "react";
import BranchForm from "./BranchForm";
import useMutationCreateBranch from "../../../hooks/useMutationCreateBranch";
import useMutationUpdateBranch from "../../../hooks/useMutationUpdateBranch";
import useQueryBranch from "../../../hooks/useQueryBranch";
import { ErrorInfo, RequestBranchProps } from "../../../types/types";
import { useParams } from "react-router-dom";
import ErrorDialog from "../../../ui-component/modal/ErrorDialog";
import { useNavigate } from "react-router-dom";
import SuccessDialog from "../../../ui-component/modal/SuccessDialog";
import { AxiosError } from "axios";
import { alertDuration } from "../../../store/constant";
import { BRANCH_URL } from "../../../routes/Routes";

const CreateUpdateBranch = () => {
  const { branchId } = useParams();
  const { mutateAsync: createBranch } = useMutationCreateBranch();
  const { mutateAsync: updateBranch } = useMutationUpdateBranch();
  const navigate = useNavigate();
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
      navigate(BRANCH_URL);
    }, alertDuration);
  };

  const { branch, status } = useQueryBranch({
    branchId: branchId!,
  });
  const handleOnSubmit = async (branch: RequestBranchProps) => {
    try {
      if (!!branchId) {
        await updateBranch({
          branchId,
          updateVariables: branch,
        });

        handleSuccessDialog();
      } else {
        await createBranch({
          createBranchVariables: branch,
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
        <BranchForm initialBranch={branch} onSubmit={handleOnSubmit} />
      )}
      {status === "loading" && (
        <BranchForm initialBranch={branch} onSubmit={handleOnSubmit} />
      )}

      <SuccessDialog
        open={openSuccessDialog}
        message={branchId ? "Edit Successfully!" : "Create Successfully!"}
      />
      <ErrorDialog open={openErrorDialog} message={errorMessage} />
    </>
  );
};
export default CreateUpdateBranch;
