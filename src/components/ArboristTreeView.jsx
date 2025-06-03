import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { styled } from "@mui/material/styles";
import {
  alpha,
  Box,
  Button,
  Collapse,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  TreeItemDragAndDropOverlay,
  TreeItemIcon,
  TreeItemProvider,
  useTreeItem,
  useTreeItemModel,
  TreeItemCheckbox,
  TreeItemIconContainer,
  TreeItemLabel,
} from "@mui/x-tree-view";
import { animated, useSpring } from "@react-spring/web";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FolderRounded from "@mui/icons-material/FolderRounded";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import convertDataStructure from "../utils/convertDataStructure";
import { useApiClient } from "../context/ApiClientContext";
import axios from "axios";

function DotIcon() {
  return (
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: "70%",
        bgcolor: "warning.main",
        display: "inline-block",
        verticalAlign: "middle",
        zIndex: 1,
        mx: 1,
      }}
    />
  );
}

const getAllItemsWithChildrenItemIds = (data) => {
  const itemIds = [];
  const registerItemId = (item) => {
    if (item.children?.length) {
      itemIds.push(item.id);
      item.children.forEach(registerItemId);
    }
  };
  data.forEach(registerItemId);
  return itemIds;
};

const TreeItemRoot = styled("li")(({ theme }) => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  outline: 0,
  color: theme.palette.secondary.main,
  ...theme.applyStyles("light", {
    color: theme.palette.grey[800],
  }),
}));

const TreeItemContent = styled("div")(({ theme, expandable }) => ({
  padding: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  paddingLeft: `calc(${theme.spacing(
    1
  )} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
  width: "100%",
  boxSizing: "border-box", // prevent width + padding to overflow
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
  flexDirection: "row-reverse",
  borderRadius: theme.spacing(0.7),
  marginBottom: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
  fontWeight: 500,
  //backgroundColor: expandable && alpha(theme.pprimaryalette.primary.main, 0.2),
  //color: expandable && theme.palette..contrastText,
  "&[data-expanded]:not([data-focused], [data-selected]) .labelIcon": {
    color: alpha(theme.palette.secondary.main, 0.2),
    ...theme.applyStyles("light", {
      color: theme.palette.primary.main,
    }),
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      left: "16px",
      top: "44px",
      height: "calc(100% - 48px)",
      width: "1.5px",
      // backgroundColor: theme.palette.primary.main,
      // ...theme.applyStyles("light", {
      //   backgroundColor: theme.palette.primary.light,
      // }),
    },
  },
  [`&[data-focused], &[data-selected]`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    color: theme.palette.primary.contrastText,
    ...theme.applyStyles("light", {
      backgroundColor: theme.palette.secondary.main,
    }),
  },
  "&:not([data-focused], [data-selected]):hover": {
    backgroundColor: theme.palette.secondary.light,
    color: "white",
    // ...theme.applyStyles('light', {
    //   color: theme.palette.secondary.dark,
    // }),
  },
}));

const CustomCollapse = styled(Collapse)({
  padding: 0,
});

const AnimatedCollapse = animated(CustomCollapse);

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

const TreeItemLabelText = styled(Typography)({
  color: "inherit",
  // fontFamily: 'General Sans',
  // fontWeight: 600,
});

function CustomLabel({ icon: Icon, expandable, children, ...other }) {
  return (
    <TreeItemLabel
      {...other}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {Icon && (
        <Box
          component={Icon}
          className="labelIcon"
          color="inherit"
          sx={{ mr: 1, fontSize: "1.2rem" }}
        />
      )}

      <TreeItemLabelText variant="body2">{children}</TreeItemLabelText>
      {expandable && <DotIcon />}
    </TreeItemLabel>
  );
}

const getIconFromFileType = (fileType) => {
  switch (fileType) {
    case "image":
      return ImageIcon;
    case "pdf":
      return PictureAsPdfIcon;
    case "doc":
      return ArticleIcon;
    case "video":
      return VideoCameraBackIcon;
    case "folder":
      return FolderRounded;
    case "pinned":
      return FolderOpenIcon;
    case "trash":
      return DeleteIcon;
    default:
      return ArticleIcon;
  }
};

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getContextProviderProps,
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  const item = useTreeItemModel(itemId);

  let icon;
  if (status.expandable) {
    icon = FolderRounded;
  } else if (item.fileType) {
    icon = getIconFromFileType(item.fileType);
  }

  return (
    <TreeItemProvider {...getContextProviderProps()}>
      <TreeItemRoot {...getRootProps(other)}>
        <TreeItemContent
          {...getContentProps({
            expandable: status.expandable && status.expanded,
          })}
        >
          <TreeItemIconContainer {...getIconContainerProps()}>
            <TreeItemIcon status={status} />
          </TreeItemIconContainer>
          <TreeItemCheckbox {...getCheckboxProps()} />
          <CustomLabel
            {...getLabelProps({
              icon,
              expandable: status.expandable && status.expanded,
            })}
          />
          <TreeItemDragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </TreeItemContent>
        {children && <TransitionComponent {...getGroupTransitionProps()} />}
      </TreeItemRoot>
    </TreeItemProvider>
  );
});

function getMatchingExpandedIds(items, part, lot) {
  const lowerPart = part.toLowerCase();
  const lowerLot = lot.toLowerCase();
  const expandedIds = [];

  const traverse = (item) => {
    if (item.children) {
      const matchedChildren = item.children.some(traverse);
      const isMatch = item.label.toLowerCase().includes(lowerPart || lowerLot);

      if (matchedChildren || isMatch) {
        expandedIds.push(item.id);
        return true;
      }
    } else if (item.label.toLowerCase().includes(lowerPart || lowerLot)) {
      return true;
    }
    return false;
  };

  items.forEach(traverse);
  return expandedIds;
}

export default function TreeFilter() {
  const [expandedItems, setExpandedItems] = React.useState([]);
  const [partSearch, setPartSearch] = React.useState("");
  const [lotSearch, setLotSearch] = React.useState("");
  const apiClient = useApiClient();
  const [errors, setErrors] = React.useState({});

  const [baseTreeData, setBaseTreeData] = React.useState([]);
  const [filteredTreeData, setFilteredTreeData] = React.useState([]);

  const handleExpandedItemsChange = (event, itemIds) => {
    console.log("expandId:", itemIds);
    setExpandedItems(itemIds);
  };

  const getItemClick = (event, itemId) => {
    console.log("item click:", itemId);
  };

  const handleExpandClick = () => {
    setExpandedItems((oldExpanded) =>
      oldExpanded.length === 0
        ? getAllItemsWithChildrenItemIds(filteredTreeData)
        : []
    );
  };

  const searchData = async () => {
    try {
      // If no search terms, clear the tree
      // if (!partSearch && !lotSearch) {
      //   setFilteredTreeData([]);
      //   setExpandedItems([]);
      //   return;
      // }

      const response = await axios.get(`${apiClient}/Job/GetNestedShowChildren`, {
        params: {
          partnum: partSearch,
          lotnum: lotSearch,
        },
      });
      console.log('response', response.data.jobs);
      
      const nestedData = response.data?.jobs ?? [];

      if (nestedData.length) {
        const transformed = convertDataStructure(nestedData);
        console.log('transformed Data', transformed);
        
        setFilteredTreeData(transformed);
        setExpandedItems(
          getMatchingExpandedIds(transformed, partSearch, lotSearch)
        );
      } else {
        setFilteredTreeData([]);
        setExpandedItems([]);
        setErrors({ Error: "No results found" });
      }
    } catch (error) {
      console.error("Search failed:", error);
      setErrors({ Failed: "Search error. Please try again." });
    }
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <div>
        <TextField
          label="Part Number"
          variant="outlined"
          size="small"
          value={partSearch}
          onChange={(e) => setPartSearch(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Lot Number"
          variant="outlined"
          size="small"
          value={lotSearch}
          onChange={(e) => setLotSearch(e.target.value)}
          sx={{ ml: 2 }}
        />
        <Button onClick={searchData} variant="contained" sx={{ ml: 2 }}>
          Search
        </Button>

        <Button
          onClick={() => {
            setFilteredTreeData(baseTreeData);
            setExpandedItems([]);
            setPartSearch("");
            setLotSearch("");
            setErrors({});
          }}
          variant="outlined"
          sx={{ ml: 2 }}
        >
          Reset
        </Button>
      </div>
      <Box
        sx={{
          height: "100vh",
          overflow: "auto",
          minWidth: 250,
          "& .MuiTreeItem-content": {
            marginBottom: 1,
          },
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <RichTreeView
          items={filteredTreeData}
          expandedItems={expandedItems}
          onExpandedItemsChange={handleExpandedItemsChange}
          //defaultSelectedItems="1.1"
          sx={{
            height: "fit-content",
            flexGrow: 1,
            //maxWidth: 400,
            overflowY: "auto",
          }}
          slots={{ item: CustomTreeItem }}
          itemChildrenIndentation={24}
          onItemClick={getItemClick}
        />
      </Box>
    </Stack>
  );
}
