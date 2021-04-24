import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../../../shared/constants/AppEnums';
import {IArtikelCategories} from '../../../../../../pages/admin-web/artikel';
import {nanoid} from 'nanoid';
import {IArtikelListParentState} from '..';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400,
    fontWeight: Fonts.REGULAR,
  },
});

interface IArtikelCategoryProps {
  data: IArtikelCategories;
  parentState: IArtikelListParentState;
  redirectCategories: () => void;
}

const ArtikelCategory = ({
  data,
  parentState,
  redirectCategories,
}: IArtikelCategoryProps) => {
  const classes = useStyles();

  const handleCategoryTypeChange = (categoryType: string) => {
    const found = parentState.expanded.find((type) => type === categoryType);
    if (found)
      parentState.setExpanded(
        parentState.expanded.filter((type) => type !== categoryType),
      );
    if (!found)
      parentState.setExpanded([...parentState.expanded, categoryType]);
  };
  const handleCategoryChange = (categorySlug: string) => {
    parentState.setSelected(categorySlug);
  };

  return (
    <TreeView
      className={classes.root}
      expanded={parentState.expanded}
      selected={parentState.selected}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}>
      {/* DINAMIS */}
      <TreeItem
        nodeId='dinamis'
        label='Dinamis'
        onClick={() => handleCategoryTypeChange('dinamis')}>
        {data.dinamis.map((cat, i) => (
          <TreeItem
            key={nanoid()}
            nodeId={`${cat.slug}`}
            label={cat.name}
            onClick={() => handleCategoryChange(cat.slug)}
          />
        ))}
      </TreeItem>

      {/* STATIS */}
      <TreeItem
        nodeId='statis'
        label='Statis'
        onClick={() => handleCategoryTypeChange('statis')}>
        {data.statis.map((cat) => (
          <TreeItem
            key={nanoid()}
            nodeId={`${cat.slug}`}
            label={cat.name}
            onClick={() => handleCategoryChange(cat.slug)}
          />
        ))}
      </TreeItem>
    </TreeView>
  );
};

export default ArtikelCategory;
