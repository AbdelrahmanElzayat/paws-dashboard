import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ViewUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // استرجاع التوكن من الكوكيز
        const token = Cookies.get("token"); // التوكن المخزن في الكوكيز

        if (!token) {
          toast.error("No token found in cookies");
          return <Navigate to="/login" />;
        }

        // إرسال الطلب باستخدام التوكن في الهيدر
        const response = await axios.get(
          "https://hub.ppte.sa/event_handler/api/participants",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response?.data?.data || []); // تعديل بناءً على هيكل الرد من الـ API
      } catch (error) {
        toast.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const columns = [
    {
      name: "ID",
      selector: (row) => row.idasparticipant_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Company",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "Position",
      selector: (row) => row.position,
      sortable: true,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">View Participants</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          title="Participants List"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
        />
      )}
    </div>
  );
};

export default ViewUsers;
