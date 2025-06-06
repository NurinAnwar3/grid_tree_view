import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import {
  TreeItemContent,
  TreeItemIconContainer,
  TreeItemRoot,
  TreeItemGroupTransition,
} from '@mui/x-tree-view/TreeItem';
import { useTreeItem } from '@mui/x-tree-view/useTreeItem';
import { TreeItemProvider } from '@mui/x-tree-view/TreeItemProvider';
import {TreeItemIcon }from '@mui/x-tree-view';

const CustomTreeItemRoot = styled(TreeItemRoot)(({ theme, ownerState }) => ({
  '--tree-view-color': ownerState.color,
  '--tree-view-bg-color': ownerState.bgColor,
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    '--tree-view-color': ownerState.colorForDarkMode,
    '--tree-view-bg-color': ownerState.bgColorForDarkMode,
  }),
}));

const CustomTreeItemContent = styled(TreeItemContent)(({ theme }) => ({
  marginBottom: theme.spacing(0.3),
  color: (theme.vars || theme).palette.text.secondary,
  borderRadius: theme.spacing(2),
  paddingRight: theme.spacing(1),
  paddingLeft: `calc(${theme.spacing(1)} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
  fontWeight: theme.typography.fontWeightMedium,
  '&[data-expanded]': {
    fontWeight: theme.typography.fontWeightRegular,
  },
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.action.hover,
  },
  '&[data-focused], &[data-selected], &[data-selected][data-focused]': {
    backgroundColor: `var(--tree-view-bg-color, ${(theme.vars || theme).palette.action.selected})`,
    color: 'var(--tree-view-color)',
  },
}));

const CustomTreeItemIconContainer = styled(TreeItemIconContainer)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props;

  const {
    getContextProviderProps,
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  const treeItemRootOwnerState = {
    color,
    bgColor,
    colorForDarkMode,
    bgColorForDarkMode,
  };

  return (
    <TreeItemProvider {...getContextProviderProps()}>
      <CustomTreeItemRoot
        {...getRootProps(other)}
        ownerState={treeItemRootOwnerState}
      >
        <CustomTreeItemContent {...getContentProps()}>
          <CustomTreeItemIconContainer {...getIconContainerProps()}>
            <TreeItemIcon status={status} />
          </CustomTreeItemIconContainer>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              p: 0.5,
              pr: 0,
            }}
          >
            <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
            <Typography
              {...getLabelProps({
                variant: 'body2',
                sx: { display: 'flex', fontWeight: 'inherit', flexGrow: 1 },
              })}
            />
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </Box>
        </CustomTreeItemContent>
        {children && <TreeItemGroupTransition {...getGroupTransitionProps()} />}
      </CustomTreeItemRoot>
    </TreeItemProvider>
  );
});

function EndIcon() {
  return <div style={{ width: 24 }} />;
}

export default function GmailTreeView() {
  return (
    <SimpleTreeView
      aria-label="gmail"
      defaultExpandedItems={['3']}
      defaultSelectedItems="5"
      slots={{
        expandIcon: ArrowRightIcon,
        collapseIcon: ArrowDropDownIcon,
        endIcon: EndIcon,
      }}
      sx={{ flexGrow: 1, maxWidth: 400 }}
      itemChildrenIndentation={20}
    >
      <CustomTreeItem itemId="1" label="All Mail" labelIcon={MailIcon} />
      <CustomTreeItem itemId="2" label="Trash" labelIcon={DeleteIcon} />
      <CustomTreeItem itemId="3" label="Categories" labelIcon={Label}>
        <CustomTreeItem
          itemId="5"
          label="Social"
          labelIcon={SupervisorAccountIcon}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
          colorForDarkMode="#B8E7FB"
          bgColorForDarkMode={alpha('#00b4ff', 0.2)}
        />
        <CustomTreeItem
          itemId="6"
          label="Updates"
          labelIcon={InfoIcon}
          labelInfo="2,294"
          color="#e3742f"
          bgColor="#fcefe3"
          colorForDarkMode="#FFE2B7"
          bgColorForDarkMode={alpha('#ff8f00', 0.2)}
        />
        <CustomTreeItem
          itemId="7"
          label="Forums"
          labelIcon={ForumIcon}
          labelInfo="3,566"
          color="#a250f5"
          bgColor="#f3e8fd"
          colorForDarkMode="#D9B8FB"
          bgColorForDarkMode={alpha('#9035ff', 0.15)}
        />
        <CustomTreeItem
          itemId="8"
          label="Promotions"
          labelIcon={LocalOfferIcon}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
          colorForDarkMode="#CCE8CD"
          bgColorForDarkMode={alpha('#64ff6a', 0.2)}
        />
      </CustomTreeItem>
      <CustomTreeItem itemId="4" label="History" labelIcon={Label} />
    </SimpleTreeView>
  );
}
