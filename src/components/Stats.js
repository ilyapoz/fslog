import React from 'react';

import { Table, Button, ButtonToolbar, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import { loadPoints, savePoints, setLoopSegments } from '../redux/vfs/actions';

import Dev from './Dev';
import Time from './Time.js';

export default connect(state => ({
    points: state.vfs.points,
    stats: state.vfs.stats,
    draw: state.vfs.draw,
    loopSegments: state.vfs.loopSegments,
  }),
  {
    loadPoints,
    savePoints,
    setLoopSegments,
  }
)(class Stats extends React.Component {
  state = {
    cumulative: false,
  }

  render() {
    const stats = this.props.stats;
    const num_points = this.props.points.length;

    const pages = Array.from({length: stats.pages.length}, (v, i) => (
      <th scope="col" key={i}>
        <Button variant="link" onClick={() => { this.handlePageClick(i) }}>{i + 1}</Button>
      </th>
    ));

    const points = stats.formations.map((formation, id) => (
      <tr key={id}>
        {/* formations column */}
        <th scope="row">
          <Button variant="link" onClick={() => { this.handleFormationClick(id) }}>
            {this.props.draw.formation(id).name}
          </Button>
        </th>

        { // points
          Array.from({length: stats.pages.length}, (v, id) => {
            if (id >= formation.length) {
              return <td key={id}/>;
            }
            const point = formation[id];
            return (
              <td key={id} className={this.pointActive(point) ? "table-active": ""}>
                <Button variant="link" onClick={() => { this.handlePointClick(point.id) }}>
                  <Time>{this.state.cumulative ? point.cumulative : point.incremental}</Time>
                </Button>
              </td>
            );
          })
        }
        {/* Formation totals column */}
        <td><div><Time>{formation.reduce((res, el) => res + el.incremental, 0)}</Time></div></td>
      </tr>
    ));

    return (
      <>
        <Table>
          <thead>
            <tr>
              <th scope="col"></th>
              {pages}
              <th scope="col">Total</th>
            </tr>
          </thead>

          <tbody>
            {points}
          </tbody>

          <tfoot>
            <tr>
              <th scope="row">Total</th>
              {stats.pages.map((page, id) => <th scope="col" key={id}><Time>{page.finish - page.start}</Time></th>)}
              <th scope="col"><Time>{(num_points === 0 ? 0 : stats.finish_time - stats.start_time)}</Time></th>
            </tr>
          </tfoot>
        </Table>

        <Form.Check
          id="cumulative-time"
          type="checkbox"
          label="Cumulative time"
          checked={this.state.cumulative}
          onChange={this.cumulativeChanged}/>

        <ButtonToolbar className="mt-4">
          <Dev>
              <Button variant="primary" onClick={this.props.savePoints}>Save</Button>
              <Button variant="primary" className="ml-2" onClick={this.props.loadPoints}>Load</Button>
          </Dev>
          <Button
              disabled={this.props.loopSegments.length === 0}
              onClick={this.resetLoopSegments}
              variant="danger"
              className="ml-2" >
            Cancel loop
          </Button>
        </ButtonToolbar>
      </>
    );
  }

  pointActive(point) {
    return point.time - point.incremental + 0.1 < this.props.currentTime && this.props.currentTime < point.time - 0.1;
  }

  cumulativeChanged = e => {
    this.setState({cumulative: e.target.checked});
  }

  handlePointClick = (point_id) => {
    const start = point_id > 0 ?
      this.props.points[point_id - 1].time :
      Math.max(0, this.props.points[0].time - 1.5);
    const finish = this.props.points[point_id].time;

    this.props.setLoopSegments([{start, finish}]);
  }

  handlePageClick = (page) => {
    this.props.setLoopSegments([this.props.stats.pages[page]]);
  }

  handleFormationClick = (formation) => {
    const loopSegments = this.props.stats.formations[formation].map(point =>
        ({start: point.time - point.incremental, finish: point.time}));
    this.props.setLoopSegments(loopSegments);
  }

  resetLoopSegments = () => {
    this.props.setLoopSegments([]);
  }
});
