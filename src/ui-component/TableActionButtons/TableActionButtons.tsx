import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "../DeleteIcon";
import EyeIcon from "../EyeIcon";
import EditIcon from "../EditIcon";

export default function TableActionButtons({
  itemId,
  onView,
  onEdit,
  onDelete,
}: {
  itemId: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  if (!onView && !onEdit && !onDelete) return null;
  return (
    <Grid>
      {onView && (
        <IconButton
          color="secondary"
          size="large"
          aria-label="view"
          onClick={() => onView(itemId)}
        >
          <EyeIcon />
        </IconButton>
      )}
      {onEdit && (
        <IconButton
          color="secondary"
          size="large"
          aria-label="edit"
          onClick={() => onEdit(itemId)}
        >
          <EditIcon />
        </IconButton>
      )}
      {onDelete && (
        <IconButton
          color="secondary"
          size="large"
          aria-label="delete"
          onClick={() => onDelete(itemId)}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Grid>
  );
}
