import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import Table from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrons } from "../redux/reducers/CronReducer";

const Home = () => {
  const { crons, loading, error } = useSelector((state) => state.cron);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCrons());
  }, []);
  console.log(crons)
  const columns = [
    { label: "id", key: "_id" },
    { label: "Data", key: "date" },
  ];
  
  return (
    <div className="main-Container border">
      {crons && 
        <Card
        style={{
          maxHeight: "100%",
          overflowY: "auto",
          height: "100%",
          minHeight: "80vh",
        }}
        className="table-responsive border-0 rounded-1"
        >
        <Table
          columns={columns}
          generatePDFCondition={false}
          isSearchBar={true}
          TableData={crons}
          // handleSort={handleSort}
          // sortConfig={sortConfig}
          pagination={false}
          isRetrieved={false}
          headingDataOnTable={
            <div>
              <h5 className="Header-text-size TextColor">
                Information <span className="Fontcolor ">View</span>
              </h5>
            </div>
          }
          />
      </Card>
        }
    </div>
  );
};

export default Home;
