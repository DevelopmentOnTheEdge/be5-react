import React from 'react';
import be5 from '../be5';

const PoolPage = React.createClass({
  displayName: 'Pool',

  getInitialState: function(){
    return { loading: true, value: '' };
  },

  componentDidMount() {
    this._update();
  },

  render() {
    const value = this.state.value;
    return (
      <article id="pool">
        <h1>Connection pool statistics</h1>
        <div className="operationList">
          <button type="button" className="btn btn-secondary" onClick={this._update}>update</button>
        </div>
        <p dangerouslySetInnerHTML={{__html: value}} />
      </article>
    );
  },

  _update() {
    be5.net.request('pool', {}, data => {
      if (data.type !== 'error') {
        console.info(data);
        this.setState({ loading: false, value: data.result });
      }
    });
  },

});

export default PoolPage;
