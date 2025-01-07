import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hideLoader, showLoader, showLoaderMessage } from "../Loader";
import { HiOutlineRefresh } from "react-icons/hi";
import { CiCirclePlus, CiEdit, CiSearch } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward, IoMdEye } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { CRUDAPI } from "../../api/crud-api";
import toast from "react-hot-toast";
import Button from "../Button";
import Header from "../Header";
import { IoArrowBack } from "react-icons/io5";

const Table = ({
  apiEndPoint,
  apiMethod,
  apiId = "",
  tableName,
  addPerm = false,
  viewPerm = false,
  editPerm = false,
  deletePerm = false,
  onView,
  onEdit,
  onDelete,
  buttonClick,
  buttonText = "",
  replacements = [],
}) => {
  const navigate = useNavigate();

  const [pageNo, setPageNo] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLastPage, setIsLastPage] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async (pageNo, search = "") => {
    if (search.trim() === "") {
      setLoading(true);
    }

    try {
      const payload = {
        search,
        sort: {
          attributes: [],
          sorts: [],
        },
        filters: [],
        pageNo: pageNo + 1,
        itemsPerPage,
      };
      if (replacements.length) {
        replacements.forEach((replacement) => {
          Object.entries(replacement).forEach(([key, value]) => {
            payload[key] = value;
          });
        });
      }

      const response = await CRUDAPI(
        `${apiEndPoint}${apiId && `/${apiId}`}`,
        apiMethod,
        payload,
        navigate
      );
      if (response.status === "SUCCESS") {
        setHeaders(response.data.headers);
        const dataWithSerial = response.data?.data?.map((data, index) => ({
          serialNumber: index + 1,
          ...data,
        }));

        setData(dataWithSerial);
        setTotalData(response.data?.totalCount);
        if ((pageNo + 1) * itemsPerPage >= response.data?.totalCount) {
          setIsLastPage(true);
        } else {
          setIsLastPage(false);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(0, search);
  }, [search]);

  useEffect(() => {
    getData(pageNo);
  }, [pageNo]);

  const handlePageChange = (method) => {
    if (method === "FORWARD" && !isLastPage) {
      setPageNo(pageNo + 1);
    } else if (method === "BACKWARD" && pageNo > 0) {
      setPageNo(pageNo - 1);
    }
  };
  const startIndex = pageNo * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalData);

  return (
    <div className="px-10 py-2 shadow-2xl h-auto bg-white rounded-lg">
      <div className="flex justify-between items-center h-14 rounded-t-lg">
        {loading ? (
          <div className="w-full">
            {Array.from({ length: 1 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex justify-between w-full"
              >
                <p className="p-4 border-b bg-slate-400 rounded-full w-36"></p>
                <div className="flex gap-6">
                  <p className="p-4 border-b bg-slate-400 rounded-full w-36"></p>
                  <p className="p-4 border-b bg-slate-400 rounded-full w-36"></p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <button
              className="border-2 border-primaryColor rounded-full p-2 text-primaryColor hover:bg-primaryColor hover:text-white ease-in-out duration-300"
              onClick={() => navigate(-1)}
            >
              <IoArrowBack size={20} />
            </button>
            <Header title={tableName} />
            <div className="flex items-center gap-6">
              <div className="flex items-center relative">
                <input
                  type="text"
                  className="h-8 w-44 border-2 border-gray-400 outline-none pl-4 pr-8 rounded-full font-Poppins text-sm"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CiSearch
                  className="absolute right-3 text-slate-400"
                  size={20}
                />
              </div>
              {addPerm && <Button label={buttonText} onClick={buttonClick} />}
            </div>
          </>
        )}
      </div>
      <div className="pb-4 border-2 mt-2 rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            {loading ? (
              <tr className="animate-pulse">
                {Array.from({ length: 5 }).map((_, index) => (
                  <td
                    key={index}
                    className="p-4 border-b bg-slate-400 rounded-full"
                  ></td>
                ))}
              </tr>
            ) : (
              <tr className="text-left text-sm text-zinc-600 font-Poppins bg-slate-200">
                <th className="p-4 border-b">S.No.</th>
                {headers?.map((header, index) => (
                  <th key={index} className="p-4 border-b">
                    {header.headerLabel}
                  </th>
                ))}
                <th className="p-4 border-b">Actions</th>
              </tr>
            )}
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <td
                      key={index}
                      className="p-4 border-b bg-slate-400 rounded-full"
                    ></td>
                  ))}
                </tr>
              ))
            ) : data?.length ? (
              data.map((dt, index) => (
                <tr
                  key={index}
                  className="font-Poppins text-zinc-600 text-sm hover:bg-gray-100"
                >
                  <td className="p-4 border-b">{startIndex + index}</td>
                  {headers.map((header, idx) => (
                    <td key={idx} className="p-4 border-b">
                      {dt[header.headerKey]}
                    </td>
                  ))}
                  <td className="p-4 border-b text-left flex justify-left gap-2">
                    {viewPerm && (
                      <button
                        className="bg-primaryColor text-white rounded-full p-1"
                        onClick={() => onView(dt.id)}
                      >
                        <IoMdEye size={15} />
                      </button>
                    )}
                    {editPerm && (
                      <button
                        className="bg-primaryColor text-white rounded-full p-1"
                        onClick={() => onEdit(dt.id)}
                      >
                        <CiEdit size={15} />
                      </button>
                    )}
                    {deletePerm && (
                      <button className="bg-primaryColor text-white rounded-full p-1">
                        <MdDeleteOutline size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  className="p-4 text-center font-poppins text-lg text-gray-500"
                >
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {data?.length > 0 && (
          <div className="flex justify-end gap-4 items-center mt-4">
            {loading ? (
              <div className="bg-slate-400 animate-pulse w-28 h-10 rounded-full"></div>
            ) : (
              <>
                <div>
                  {startIndex}-{endIndex} of {totalData}
                </div>
                <div className="flex items-center gap-2">
                  {pageNo > 0 && (
                    <button
                      onClick={() => handlePageChange("BACKWARD")}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <IoIosArrowBack />
                    </button>
                  )}

                  {!isLastPage && (
                    <button
                      onClick={() => handlePageChange("FORWARD")}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <IoIosArrowForward />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
