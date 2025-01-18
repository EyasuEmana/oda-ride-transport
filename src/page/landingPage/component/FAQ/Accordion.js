import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdExpandMore } from "react-icons/md";

import faqData from "./FaqData";
import { Divider, useMediaQuery, useTheme } from "@mui/material";

export default function FaqAccordion() {
  const [expanded, setExpanded] = React.useState("panel1");
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.up("md"));
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      style={{
        width: "100%",
        marginLeft: !isMatch && "20px",
        marginRight: !isMatch && "20px",
      }}
    >
      {faqData.map((data, index) => (
        <Accordion
          key={data.name}
          expanded={expanded === data.name}
          onChange={handleChange(data.name)}
          sx={{ backgroundColor: "#D9D9D9" }}
        >
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              {data.summary}
            </Typography>
          </AccordionSummary>
          <Divider
            sx={{ width: "100%", backgroundColor: "#FFF", height: "5px" }}
          />
          <AccordionDetails>
            <Typography>{data.data}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
