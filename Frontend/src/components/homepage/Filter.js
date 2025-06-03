import React, { useEffect, useState } from "react";
import summaryApi from "../../common";
import {
  Box,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

const Filter = ({ onFilter, products, onClickFilter }) => {
  const min = 0;
  const max = 5000000;
  const step = 50000;
  const [selectBrand, setSelectBrand] = useState([]);
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickFilter = () => {
  if (!Array.isArray(products)) {
    onFilter([]);
    return;
  }
  const filtered = products.filter((product) => {
    const inPriceRange =
      product.minPrice >= value[0] && product.minPrice <= value[1];
    const matchesBrand = selectBrand.length
      ? selectBrand.includes(product.brand.name)
      : true;
    return inPriceRange && matchesBrand;
  });
  onClickFilter();
  onFilter(filtered);
};

  return (
    <div className="relative p-6 w-full bg-white rounded-lg shadow-xl ">
      <div className="w-full grid grid-cols-1 justify-between items-start gap-y-8">
        <div>
          <Box margin="0 auto">
            <Typography
              gutterBottom
              sx={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Bạn muốn tìm kiếm gì?
            </Typography>
          </Box>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="course"
              control={<Radio />}
              label="Khóa học"
            />
            <FormControlLabel
              value="document"
              control={<Radio />}
              label="Tài liệu"
            />
          </RadioGroup>
        </div>
      </div>

      <div className=" mt-10">
        <button
          onClick={handleClickFilter}
          className="w-full p-2 text-white uppercase rounded-lg shadow-lg
           bg-gradient-to-r from-teal-500 via-teal-300 to-teal-500 transition-all 
           duration-500 ease-in-out bg-[length:200%_auto] hover:bg-[position:right_center]"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default Filter;
