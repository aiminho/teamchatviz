/*
  Slack Viz
  Copyright (C) 2016 Moovel Group GmbH, Haupstaetter str. 149, 70188, Stuttgart, Germany hallo@moovel.com

  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301
  USA
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Emoji } from 'client/components/Emoji.js';
import { Map, List } from 'immutable';

export default React.createClass({
  getInitialState() {
    return {
      data: Map({
        height: 0,
      })
    };
  },

  componentDidMount() {
    this.setState(({data}) => ({
      data: data.update('height', () => parseFloat(ReactDOM.findDOMNode(this).parentNode.style.top.replace('px', '')))
    }));
  },

  componentWillReceiveProps() {
    this.setState(({data}) => ({
      data: data.update('height', () => parseFloat(ReactDOM.findDOMNode(this).parentNode.style.top.replace('px', '')))
    }));
  },

  render() {
    const item = this.props.item;
    const maxY = this.props.maxY;
    const emojis = this.props.emojis;
    const height = this.state.data.get('height');
    // todo: depends on the chart height
    const totalHeight = (600 - height - 45);
    return <div key={this.props.key} className="emoji-timeline-column"
      style={{ height: totalHeight + 'px'}}>
        {
          item.emojis
            .slice(0, parseInt( totalHeight / 60 ))
            .map((reaction, i) => {
              return <Emoji emojis={emojis} style={{ display: 'block' }} name={reaction.name} count={reaction.count} />;
            })
        }
        {
          (item.emojis.length > 10 && totalHeight > 50) ?
          <Emoji style={{ display: 'block' }} name={'...'} count={''} />
          : <div></div>
        }
      </div>
  }
});
