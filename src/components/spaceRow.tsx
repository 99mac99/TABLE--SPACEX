import React, { FC } from "react";
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

 interface spaceRow  { launch_date_utc: number; mission_name: string; description: string; }

const SpaceRow: React.FC<spaceRow> = ({launch_date_utc, mission_name, description}) => (
    <>
    <Table striped bordered hover variant="dark">
        <tr>
            <td className='rowHead'>{launch_date_utc}</td>
            <td className='rowHead'>{mission_name}</td>
            <td className='rowHead'>{description}</td>
            <td className='rowHead'> </td>
        </tr>
</Table>
</>

)

export default SpaceRow;
