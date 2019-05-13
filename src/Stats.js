import React from 'react';

import Time from './Time.js';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cumulative: false,
    }
  }

  render() {
    const stats = this.props.draw.stats(this.props.points);
    const num_points = this.props.points.length;
    const pages = Array.from({length: stats.pages.length}, (v, i) => (
      <th scope="col" key={i}>
        <a href="/#" onClick={(e) => this.handlePageClick(e, stats, i)}>{i + 1}</a>
      </th>
    ));
    const points = stats.formations.map((formation, id) => (
      <tr key={id}>
        <th scope="row">
          <a href="/#" onClick={(e) => this.handleFormationClick(e, stats, id)}>
            {this.props.draw.formation(id).name}
          </a>
        </th>
        {
          Array.from({length: stats.pages.length}, (v, id) => {
            if (id >= formation.length) {
              return <td key={id}/>;
            }
            const point = formation[id];
            return (
              <td key={id} className={this.pointActive(point) ? "table-active": ""}>
                <a href="/#" onClick={(e) => this.handlePointClick(e, stats, point.id)}>
                  <Time>{this.state.cumulative ? point.cumulative : point.incremental}</Time>
                </a>
              </td>
            );
          })
        }
        <td><div><Time>{formation.reduce((res, el) => res + el.incremental, 0)}</Time></div></td>
      </tr>
    ));
    return (
      <>
        <table className="table">
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
        </table>
        <div className="form-check">
          <label className="form-check-label">
          <input type="checkbox" className="form-check-input"
            checked={this.state.cumulative} onChange={this.cumulativeChanged}/>
          Cumulative time</label>
        </div>
      </>
    );
  }

  pointActive(point) {
    return point.time - point.incremental + 0.1 < this.props.currentTime && this.props.currentTime < point.time - 0.1;
  }

  cumulativeChanged = (e) => {
    this.setState({cumulative: e.target.checked});
  }

  handlePointClick(e, stats, point_id) {
    this.props.onPointClick(stats, point_id);
    e.preventDefault();
  }

  handlePageClick(e, stats, page) {
    this.props.onPageClick(stats, page);
    e.preventDefault();
  }

  handleFormationClick(e, stats, formation) {
    this.props.onFormationClick(stats, formation);
    e.preventDefault();
  }
};

export default Stats;
