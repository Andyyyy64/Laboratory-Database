import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLabos } from "../../api/labo";
import { getComments } from "../../api/comment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress  from "@mui/material/CircularProgress";

import { useLoading } from "../../hooks/useLoading";

type LaboType = {
  labo_id: number;
  name: string;
  prof: string;
  prof_email: string;
  description: string;
  prerequisites: string;
  room_number: string;
  student_field: string[];
  liked_number: number;
};

export const DisplayLabo: React.FC = () => {
  const [labo, setLabo] = useState<Array<LaboType>>([]);
  const [laboComments, setLaboComments] = useState<{ [key: number]: number }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [field, setField] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("field_of_interest") ?? "");
  const { loading, startLoading, stopLoading } = useLoading();

  const itemsPerPage = 9;
  const navi = useNavigate();

  useEffect(() => {
    const fetchLabo = async () => {
      startLoading();
      try {
        const res = await getLabos(searchTerm);
        if (field === "All" || field === "") {
          setLabo(res);
        } else {
          const filteredLabo = res.filter((item: LaboType) => {
            return item.student_field.includes(field);
          });
          setLabo(filteredLabo);
        }
      } catch (err) {
        console.log(err);
      } finally {
        stopLoading();
      }
    };
    fetchLabo();
  }, [searchTerm, field]);

  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const commentsCount = await Promise.all(
          labo.map(async (item) => {
            const comments = await getComments(item.labo_id);
            return { [item.labo_id]: comments.length };
          })
        );

        const commentsCountObj = commentsCount.reduce((acc, current) => {
          return { ...acc, ...current };
        }, {});

        setLaboComments(commentsCountObj);
      } catch (err) {
        console.log(err);
      }
    };
    if (labo.length > 0) {
      fetchCommentsCount();
    }
  }, [labo]);

  const handleLaboClick = (labo_id: number) => {
    navi(`/labo/${labo_id}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems: LaboType[] = [];
  if(labo !== null) {
    currentItems = labo.slice(indexOfFirstItem, indexOfLastItem);
  }

  const totalPages = Math.ceil(labo.length / itemsPerPage);

  return (
    <div className="bg-white p-4">
      <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-3">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/4 p-2 rounded-full border bg-gray-300 text-black mb-4 sm:mb-0"
        />
        <Tooltip title="Search by field" placement="top" arrow>
          <Select
            value={field}
            label="Field"
            onChange={(e: SelectChangeEvent) => setField(e.target.value)}
            className="w-32 h-12 p-2 rounded-full border bg-gray-300 text-black"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="CS">CS</MenuItem>
            <MenuItem value="IT-SPR">IT-SPR</MenuItem>
            <MenuItem value="IT-CMV">IT-CMV</MenuItem>
            <MenuItem value="SY">SY</MenuItem>
            <MenuItem value="CN">CN</MenuItem>
            <MenuItem value="SE-DE">SE-DE</MenuItem>
          </Select>
        </Tooltip>
      </div>
      {loading ? (
        <div className="flex justify-center mt-16 mb-32">
          <CircularProgress />
        </div>
      ) : (
        <div className="m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {labo.length > 0 ? (
            currentItems.map((item, index) => (
              <div
                key={index}
                className="border-4 p-4 text-center text-black cursor-pointer hover:bg-gray-500 hover:text-sky-200"
              >
                <div onClick={() => handleLaboClick(item.labo_id)}>
                  <div className="text-lg font-bold">{item.prof}</div>
                  <div className="mt-2">{item.name}</div>
                  <div className="mt-2">{item.student_field.join(", ")}</div>
                </div>
                <div className="mt-4 flex justify-between">
                  {item.liked_number > 0 && (
                    <div className="text-teal-400 font-bold">
                      {item.liked_number}人が興味あり
                    </div>
                  )}
                  {laboComments[item.labo_id] > 0 && (
                    <div className="text-green-600 font-bold">
                      {laboComments[item.labo_id] ?? 0}人がコメント
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-teal-700 text-lg font-bold mt-12">
              お探しの結果が見つかりませんでした。別のキーワードを試してみてください。
            </p>
          )}
        </div>
      )}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`p-2 w-10 h-10 flex items-center justify-center rounded ${
              currentPage === index + 1
                ? "bg-teal-400 text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
