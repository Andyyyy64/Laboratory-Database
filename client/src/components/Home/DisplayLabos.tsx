import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getLabos } from "../../api/labo";
import { getComments } from "../../api/comment";


import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

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
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("field_of_interest") ?? ""
  );

  const itemsPerPage = 9;
  const navi = useNavigate();

  useEffect(() => {
    const fetchLabo = async () => {
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
      }
    };
    fetchLabo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, field, labo.length === 0]);

  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        // Map through labo and get comments for each labo_id
        const commentsCount = await Promise.all(
          labo.map(async (item) => {
            const comments = await getComments(item.labo_id);
            return { [item.labo_id]: comments.length };
          })
        );

        // Transform the array of objects into a single object
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
  const currentItems = labo.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(labo.length / itemsPerPage);

  return (
    <div className="bg-white">
      <div className="bg-white flex flex-col">
        <div className="m-2 p-4 flex justify-center space-x-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[20%] p-2 rounded-full border bg-gray-300 text-black"
          />
          <Tooltip title="Search by field" placement="top" arrow>
            <Select
              value={field}
              label="Field"
              onChange={(e: SelectChangeEvent) => setField(e.target.value)}
              className="w-[6%] h-14 p-2 rounded-full border bg-gray-300 text-black"
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
        {
          labo.length > 0 ? (
            currentItems.map((item, index) => (
              <div className="flex flex-row">
                <div
                  key={index}
                  className="flex flex-row m-2 ml-[25%] border-4 text-center w-[50%] text-black p-2 cursor-pointer hover:bg-gray-500 hover:text-sky-200"
                  onClick={() => handleLaboClick(item.labo_id)}
                >
                  <div className="flex-none">{item.prof}</div>
                  <div className="grow ">{item.name}</div>
                  <div className="flex-none">{item.student_field + ""}</div>
                </div>
                <div className="flex flex-row">
                  {item.liked_number > 0 && (
                    <div className="flex-none text-teal-400 mt-4 font-bold">
                      {item.liked_number}人が興味あり
                    </div>
                  )}
                  {
                    laboComments[item.labo_id] > 0 && (
                      <div className="flex-none text-green-600 mt-4 font-bold ml-4">
                        {laboComments[item.labo_id] ?? 0}人がコメント
                      </div>
                    )}
                </div>

              </div>
            ))
          ) : (
            <p className="text-center pt-16 pl-6 text-teal-700 text-lg font-bold"> お探しの結果が見つかりませんでした。別のキーワードを試してみてください。</p>
          )}
      </div>
      <div className="bg-white flex justify-center mt-4 p-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`mr-2 bg-black  ${currentPage === index + 1 ? "text-teal-400" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
