import React, {useState} from "react";
import styled from "styled-components";
import {sortArray} from "../utils/utils";
import {useTableData} from "../hooks";
import {BODY, DESC, ID, TITLE, USERNAME} from "../config/types";
import {TableData} from "../interfaces/TableData";
import {SortIcons} from "../interfaces/SortIcons";
import SortIcon from "../components/SortIcon";

const Table = styled.table`
  td, th{
      padding: 7px;
      &:nth-child(1){
      text-align: center;
      width: 40px;
      }
      &:nth-child(2){
      text-align: center;
      width: 8rem;
      }
      &:nth-child(5){
      width: 2rem;
      }
      &:nth-child(6){
      width: 2rem;
      }
    }
`;

const TableBody = styled.tbody`
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
  display:block;
  height: calc(100vh - 100px);
  overflow-x: hidden;
  overflow-y: auto;
  -moz-border-radius-bottomleft: 10px;
  -moz-border-radius-bottomright: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  
  &::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(100,100,100,0.3);
    box-shadow: inset 0 0 6px rgba(100,100,100,0.3);
    background-color: #F5F5F5;
  }

  &::-webkit-scrollbar{
    width: 10px;
    background-color: #F5F5F5;
  }

  &::-webkit-scrollbar-thumb{
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(100,100,100,.2);
    box-shadow: inset 0 0 6px rgba(100,100,100,0.2);
    background-color: #AAA;
  }

  tr{
    display:table;
    width:100%;
    table-layout:fixed;
    padding-right: 10px;
  }
  
  tr:nth-child(odd){
  background: rgba(214,225,255,0.44);
  }
`;

const TableHead = styled.thead`
  background: #7e4bff;
  color: #FFFFFF;
  font-weight: 600;
  height: 3rem;
  width: 100%;
  display:table;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  -moz-border-radius-topleft: 10px;
  -moz-border-radius-topright: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  table-layout: fixed;
`;


export default function PostsPage() {
    const [sortedData, setSortedData] = useState<Array<TableData>>([]);
    const [sortIcon, setSortIcon] = useState<SortIcons>({
        id: null,
        username: null,
        title: null,
        body: null
    });
    const initialData = useTableData();

    const handleSort = (e: any) => {
        alert(e.target.dataset.sort);
        if (sortedData.length) {
            console.log('sorted');
            setSortedData([...sortArray(sortedData, e.target.dataset.sort, DESC)]);
        } else {
            console.log('initialData');
            setSortedData(sortArray(initialData, e.target.dataset.sort, DESC));
        }
    };
    console.log(sortedData);
    const tableRows = sortedData.length > 0 ? sortedData : initialData;

    return (
        <>
            {tableRows ?
                <Table>
                    <TableHead>
                        <tr>
                            <th onClick={handleSort} data-sort={ID}>ID <SortIcon status={sortIcon.id}/></th>
                            <th onClick={handleSort} data-sort={USERNAME}>Author <SortIcon status={sortIcon.username}/></th>
                            <th onClick={handleSort} data-sort={TITLE}>Title <SortIcon status={sortIcon.title}/></th>
                            <th onClick={handleSort} data-sort={BODY}>Text <SortIcon status={sortIcon.body}/></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {tableRows.map(row => <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.username}</td>
                            <td>{row.title}</td>
                            <td>{row.title}</td>
                            <td>Edit</td>
                            <td>Del</td>
                        </tr>)}
                    </TableBody>
                </Table> :
                <div>preloader</div>
            }
        </>
    )
}
