import React from 'react';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { lighten } from 'material-ui/styles/colorManipulator';

import './ProfileRecentActivityContainer.scss';

let counter = 0;
function createData(name, date, type) {
  counter += 1;
  return {
    id: counter,
    name,
    date,
    type
  };
}

const columnData = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'name'
  }, {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date'
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: true,
    label: 'Type'
  }
];

class EnhancedTableHead extends React.Component {
  createSortHandler(event, property) {
    // this.props.onRequestSort(property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount}  = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            {/* <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}/>
            */}
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding
                ? 'none'
                : 'default'}
                sortDirection={orderBy === column.id
                ? order
                : false}>
                <Tooltip
                  title="Sort"
                  placement={column.numeric
                  ? 'bottom-end'
                  : 'bottom-start'}
                  enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={event => this.createSortHandler(event, column.id)}>
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight: theme.palette.type === 'light'
    ? {
      color: theme.palette.secondary.dark,
      backgroundColor: lighten(theme.palette.secondary.light, 0.4)
    }
    : {
      color: lighten(theme.palette.secondary.light, 0.4),
      backgroundColor: theme.palette.secondary.dark
    },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
});

let EnhancedTableToolbar = props => {
  const {numSelected, classes} = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
      [classes.highlight]: numSelected > 0
    })}>
      <div className={classes.title}>
        {numSelected > 0 && <Typography variant="subheading">
          {numSelected}
          selected
        </Typography>
}
      </div>
      <div className={classes.spacer}/>
      <div className={classes.actions}>
        {numSelected > 0
          ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon/>
              </IconButton>
            </Tooltip>
          )
          : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon/>
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 800
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

class ProfileRecentActivityContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'date',
      selected: [],
      data: [
        createData('Richard Bridges', '29-01-2018', 'call'),
        createData('John Doe', '31-01-2018', 'message'),
        createData('Alice Doe', '18-02-2018', 'message'),
        createData('Brian Doe', '3-02-2018', 'call'),
        createData('Brian Doe', '3-02-2018', 'call'),
        createData('Brian Doe', '3-02-2018', 'call'),
        createData('Brian Doe', '3-02-2018', 'call')
      ].sort((a, b) => (a.date < b.date
        ? -1
        : 1)),
      page: 0,
      rowsPerPage: 5
    };
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  handleRequestSort(property){
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data = order === 'desc'
      ? this
        .state
        .data
        .sort((a, b) => (b[orderBy] < a[orderBy]
          ? -1
          : 1))
      : this
        .state
        .data
        .sort((a, b) => (a[orderBy] < b[orderBy]
          ? -1
          : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick(event, checked){
    if (checked) {
      this.setState({
        selected: this
          .state
          .data
          .map(n => n.id)
      });
      return;
    }
    this.setState({selected: []});
  };

  handleClick(event, id){
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1),);
    }

    this.setState({selected: newSelected});
  };

  handleChangePage(event, page){
    this.setState({page});
  };

  handleChangeRowsPerPage(event){
    this.setState({rowsPerPage: event.target.value});
  };

  isSelected(id) {
    return this.state.selected.indexOf(id) !== -1;
  }
  render() {
    const {classes} = this.props;
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page
    } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div className="progress-notes-table">
        <EnhancedTableToolbar numSelected={selected.length}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
             <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={event => this.handleRequestSort(event)}
              rowCount={data.length} />
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected}/>
                      </TableCell>
                      <TableCell padding="none">{n.name}</TableCell>
                      <TableCell>{n.date}</TableCell>
                      <TableCell>{n.type}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{
                  height: 49 * emptyRows
                }}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page'
                  }}
                    nextIconButtonProps={{
                    'aria-label': 'Next Page'
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileRecentActivityContainer);
