import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import React from "react";
import { TreeItemContent, TreeItemLabel, TreeItemRoot } from "@mui/x-tree-view/TreeItem";
import { styled } from "@mui/material/styles";
import data from "../data/TestData";
import transformInvoiceData from "../utils/transformInvoiceData";
import { TreeItemProvider, useTreeItem } from "@mui/x-tree-view";
import { animated, useSpring } from "@react-spring/web";

const treeData = transformInvoiceData(data);

// expand and collapse fuction
const getAllItemsWithChildrenItemIds = () => {
  const itemIds = [];
  const registerItemId = (item) => {
    if (item.children?.length) {
      itemIds.push(item.id);
      item.children.forEach(registerItemId);
    }
  };
  treeData.forEach(registerItemId);
  return itemIds;
};

// const CustomContent = styled('div', {
//   shouldForwardProp: (prop) => prop !== 'hasChildren',
// })(({ theme, hasChildren }) => ({
//   padding: theme.spacing(0.5, 1),
//   paddingLeft: `calc(${theme.spacing(1)} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
//   borderRadius: theme.shape.borderRadius,
//   display: 'flex',
//   alignItems: 'center',

//   backgroundColor: hasChildren
//     ? theme.palette.primary.light
//     : theme.palette.secondary.light,
//   color: hasChildren
//     ? theme.palette.primary.contrastText
//     : theme.palette.secondary.contrastText,

//   '&:hover': {
//     backgroundColor: hasChildren
//       ? theme.palette.primary.dark
//       : theme.palette.secondary.dark,
//   },
//   '&[data-disabled]': {
//     opacity: 0.5,
//     backgroundColor: theme.palette.action.disabledBackground,
//   },
//   '&[data-selected]': {
//     backgroundColor: theme.palette.secondary.main,
//     color: theme.palette.primary.contrastText,
//   },
// }));


const TreeItemLabelText = styled(Typography)({
  color: 'inherit',
  fontFamily: 'General Sans',
  fontWeight: 500,
});

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}
const CustomCollapse = styled(Collapse)({
  padding: 0,
});
const AnimatedCollapse = animated(CustomCollapse);


function CustomLabel({ icon: Icon, expandable, children, ...other }) {
  return (
    <TreeItemLabel
      {...other}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {Icon && (
        <Box
          component={Icon}
          className="labelIcon"
          color="inherit"
          sx={{ mr: 1, fontSize: '1.2rem' }}
        />
      )}

      <TreeItemLabelText >{children}</TreeItemLabelText>
    </TreeItemLabel>
  );
}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const { id, itemId, label, disabled, children, ...other } = props;
    const {
      getContextProviderProps,
      getRootProps,
      getContentProps,
      getLabelProps,
      getGroupTransitionProps,
      getDragAndDropOverlayProps,
      status,
    } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });
  
  return (
      <TreeItemProvider {...getContextProviderProps()}>
        <TreeItemRoot {...getRootProps(other)}>
        <TreeItemContent {...getContentProps({
         expandable: status.expandable , 
        })}>
           <CustomLabel
            {...getLabelProps({
              expandable: status.expandable && status.expanded,
            })}
          />
          </TreeItemContent>
          {children && <TransitionComponent {...getGroupTransitionProps()} />}

        </TreeItemRoot>
      </TreeItemProvider>

  );
});


export default function InvoiceTreeView() {
  const [expandedItems, setExpandedItems] = React.useState([]);

  const handleExpandedItemsChange = (event, itemIds) => {
    console.log('expandId:', itemIds);
    setExpandedItems(itemIds);
  };

  const handleOnItemClick = (event, itemId) => {
    console.log('itemsClick:', itemId);
  };

  const handleOnItemFocus = (event, itemId) => {
    console.log('itemsFocus:', itemId);
  };

  const handleExpandClick = () => {
    setExpandedItems((oldExpanded) =>
      oldExpanded.length === 0 ? getAllItemsWithChildrenItemIds() : []
    );
  };

  return (
    <Stack spacing={2}>
      <div>
        <Button onClick={handleExpandClick}>
          {expandedItems.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
      </div>
      <Box sx={{ 
        minHeight: 352, 
        minWidth: 250,
        '& .MuiTreeItem-content': {
          marginBottom: 1,
        }
      }}>
        <RichTreeView
          items={treeData}
          expandedItems={expandedItems}
          onExpandedItemsChange={handleExpandedItemsChange}
          onItemClick={handleOnItemClick}
          onItemFocus={handleOnItemFocus}
          slots={{ item: CustomTreeItem }}
        />
      </Box>
    </Stack>
  );
}
