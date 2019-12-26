import React, { Fragment } from 'react';
import { format } from 'date-fns';
import { Table, TablePagination } from '../../kits';

import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';

const UsersTable = ({ users }) => (
  <Fragment>
    <Table>
      <thead>
        <tr>
          <th className="text">Name</th>
          <th className="text">Madrasa</th>
          <th className="text-centered">Phone</th>
          <th className="text-centered">Blood Group</th>
          <th className="number">Last Donated</th>
        </tr>
      </thead>
      <tbody>
        {users.results.map(user => {
          return user.id ? (
            <tr key={user.id}>
              <td className="text">{user.name}</td>
              <td className="text">{user.madrasa ? user.madrasa.name : '-'}</td>
              <td className="text-centered">{user.mobile || '-'}</td>
              <td className="text-centered">{user.blood_group}</td>
              <td className="number">
                {user.last_donated_on
                  ? format(new Date(user.last_donated_on), 'PPpp', {})
                  : 'N/A'}
              </td>
            </tr>
          ) : (
            ''
          );
        })}
      </tbody>
    </Table>
    <TablePagination>
      {users.previous ? (
        <p className="prev">
          <ChevronLeftIcon />
        </p>
      ) : (
        ''
      )}
      <p
        className={`table-pagination-info ${
          users.next || users.previous ? 'pull-to-top' : ''
        }`}
      >
        1 to {users.next ? '' : users.count} of {users.count}
      </p>
      {users.next ? (
        <p className="next">
          <ChevronRightIcon />
        </p>
      ) : (
        ''
      )}
    </TablePagination>
  </Fragment>
);

export default UsersTable;
