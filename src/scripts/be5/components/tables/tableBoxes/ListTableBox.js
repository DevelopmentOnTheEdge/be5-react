import React, {Component} from 'react';


//todo add register new component and move to condo, add base types
class ListTableBox extends Component
{
  render(){
    const list = this.props.value.data.attributes.rows.map( (col, idx) => {
      return <li key={idx} dangerouslySetInnerHTML={ {__html: col.cells[0].content}}/>;
    });

    return (
      <ul className="listTableBox">
        {list}
      </ul>
    );
  }
}

export default ListTableBox;
