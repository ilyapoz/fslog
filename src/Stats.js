import React from 'react';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incremental: true,
    }
  }

  render() {
    const stats = this.props.draw.stats(this.props.points);
    const num_pages = Math.max(1, Math.ceil(this.props.points.length / this.props.draw.num_formations));
    const pages = Array.from({length: num_pages}, (v, i) => <th key={i}>{i + 1}</th>);
    const points = stats.map((point, id) => (
      <tr key={id}>
        <td><div>{this.props.draw.formation(id).name}</div></td>
        {
          Array.from({length: num_pages}, (v, id) => {
            if (id >= point.length) {
              return null;
            }
            const current_point = point[id];
            return (
              <a href="/#" onClick={(e) => this.handlePointClick(e, current_point.id)}>
                {this.state.incremental ? current_point.incremental.toFixed(1) : current_point.cumulative.toFixed(1)}
              </a>
            );
          }).map((v, id) => <td key={id}>{v}</td>)
        }
        <td><div>{point.reduce((res, el) => res + el.incremental, 0).toFixed(1)}</div></td>
      </tr>
    ));
    return (
      <>
        <div className="form-check">
          <label className="form-check-label">
          <input type="checkbox" className="form-check-input"
            value={this.state.incremental} onChange={this.incrementalChanged}/>
          Incremental time</label>
        </div>
        <table className="table">
        <thead><tr>
            <th></th>
            {pages}
            <th>Total</th>
        </tr></thead>
        <tbody>
          {points}
        </tbody>
        </table>
      </>
    );
  }

  incrementalChanged = (e) => {
    this.setState({incremental: e.target.checked});
  }

  handlePointClick(e, point_id) {
    this.props.onPointClick(point_id);
    e.preventDefault();
  }
};

export default Stats;
