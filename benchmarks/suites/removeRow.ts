/**
 * @name removeRow
 * @description removing one row
 */

import { Suite } from 'yet-another-benchmarking-tool';
import { m, createElement, patch, VFlags, DELETE } from '../../src/index';
import { buildData } from '../data';

const el = document.createElement('table');
const data = buildData(1000);
data.forEach(({ id, label }) => {
  const row = createElement(
    m('tr', undefined, [m('td', undefined, [String(id)]), m('td', undefined, [label])]),
  );
  el.appendChild(row);
});
const row = 0;

const suite = new Suite('remove row', [
  [
    'million',
    () => {
      patch(
        el,
        m(
          'table',
          undefined,
          data.map(({ id, label }) => {
            const newId = String(id);
            return m('tr', { key: newId }, [
              m('td', undefined, [newId]),
              m('td', undefined, [label]),
            ]);
          }),
          VFlags.ONLY_KEYED_CHILDREN,
          [DELETE(row)],
        ),
      );
    },
  ],
]);

export default suite;
