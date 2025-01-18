import React from "react";
import { Box, useMediaQuery, Stack, duration } from "@mui/material";
import RSTypography from "../../../../components/RSTypography";
import RSButton from "../../../../components/RSButton";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

function ServiceCard({ imgUrl, text, id, delay }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ width: '100%' }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: { xs: '100%', md: '90%', lg: '85%' },
          minHeight: { xs: '70px', sm: '90px', md: '110px', lg: '130px' },
          maxHeight: { xs: '80px', sm: '100px', md: '120px', lg: '140px' },
          backgroundColor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          p: { xs: 0.75, sm: 1, md: 1.5 },
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: 1,
            overflow: 'hidden',
            mr: { xs: 0.75, sm: 1, md: 1.5 },
            width: { xs: '45px', sm: '65px', md: '85px', lg: '100px' },
            height: { xs: '35px', sm: '55px', md: '75px', lg: '90px' },
            flexShrink: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            ml: { xs: 0.5, sm: 0.75, md: 1 },
          }}
        >
          <Box
            sx={{
              position: 'right',
              width: { xs: '45px', sm: '65px', md: '85px', lg: '105px' },
              height: { xs: '35px', sm: '55px', md: '75px', lg: '95px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              p: { xs: 0.25, sm: 0.5, md: 0.75 },
              ml: { xs: 0.5, sm: 1, md: 1.5 },
              borderRadius: 1,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                borderRadius: 1,
                transform: 'scale(0.9)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(0.95)',
                },
                filter: 'contrast(1.05) brightness(1.02)',
              }}
              image={imgUrl}
              alt={text}
              loading="lazy"
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: { xs: 0.5, sm: 0.75, md: 1 },
            pr: { xs: 0.75, sm: 1, md: 1.5 },
            py: { xs: 0.25, sm: 0.5, md: 0.75 },
          }}
        >
          <Typography
            variant="h1"
            component="div"
            sx={{
              fontSize: { 
                xs: '0.75rem', 
                sm: '0.875rem', 
                md: '1rem',
                lg: '1.1rem' 
              },
              fontWeight: 900,
              flex: 1,
              mr: 1.5,
              lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
              
            }}
          >
            {text}
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 0.5, sm: 1, md: 1.5 }}
            sx={{
              width: '32%',
              height: '45%',
              flexWrap: 'wrap',
              position: 'relative',
            }}
          >
            <RSButton
              backgroundcolor={theme.palette.info.main}
              radius={5}
              fullWidth
              sx={{
                minWidth: { xs: '100%', sm: 'auto', md: '100px' },
                height: { xs: '22px', sm: '28px', md: '34px' },
                fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
                whiteSpace: 'nowrap',
                p: { xs: '2px 4px', sm: '3px 8px', md: '4px 12px' },
                position: 'relative',
                zIndex: 1,
                cursor: 'pointer',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: 'inherit',
                  transition: 'background-color 0.3s ease',
                },
                '&:hover': {
                  '&::before': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }
                },
                '&:active': {
                  '&::before': {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  }
                }
              }}
              onClick={() => navigate(`/home/${id}`)}
            >
              Book Now
            </RSButton>
          </Stack>
        </Box>
      </Card>
    </motion.div>
  );
}

export default ServiceCard;
