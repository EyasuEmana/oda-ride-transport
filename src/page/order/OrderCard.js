import * as React from "react";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { Collapse, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function OrderCard(props) {
  const {
    totalTripFeeInDollars,
    bookingStatus,
    travelType,
    tripType,
    numberOfPassengers,
    pickupDateTime,
    distanceInMiles,
    passengerFullName,
    occasion,
    airline,
    arrivalFlightNumber,
    numberOfSuitcases,
    accommodationAddress,
  } = props.order;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const Field = ({ label, value }) => {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ backgroundColor: "#DDD", marginY: 0.2, padding: 0.5 }}
      >
        <Typography>{label}</Typography>
        <Typography>{value}</Typography>
      </Stack>
    );
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQEBUPEBIVFQ8PEBAPDxAPFRUQDw8PFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGC4dHSUtLS0tLSstLS0tLS0tLS0tLS0tKy0tLS0rKy0rLS0tLS0tLSstLS0rLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAACAwEEAAUGBwj/xABFEAACAQIDBQMJBgQEBAcAAAABAgADEQQSIQUxQVFhBhOBFCIyUnGRobHRByNCcpLBFVNigqKy4fAzQ8LxFzRFZHOT0v/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACQRAQACAgEEAgIDAAAAAAAAAAABEQISAxMhMVEEIkFhFJGx/9oADAMBAAIRAxEAPwDuSsArLTLFlZ9C3nVisArLJWAVixWKQCsslYBWBWKwSssFYBWUVysArHlYJWAgrAKywViyICCsArLBWCVlFYrAKywVglZUVisArLDLAKwKxWAyyyyxZWVFYrAKywywGWUVysArHkQCJQgrAIjyIBEBBWARHkQCJQgiCRHFYBEKURAIjiIBEBREEiNIgkQpREEiMIkEQFESLRhEi0g9xKRZSW2SLKzz2qqUgFZZKwCsWKpWAVlorFssWUrFYJWWCsWRFlK7LFlZZYRZWWxXZYsiabtB2ywmDJV6meqP+TRs7g8mO5fE3nDbQ+1Ks1xQoU0F9DULVGt4WExPJjCxjL1AiARPLcD9p+IVvvqVN045M1N/A3I+E9I2PtJMXQTEUr5KgNg2jKQbFSOYImseSMvBOMwsEQCs1+z+0NDEV3w1Mt3tIuGDLYHI2Vsp42M2pWaiUpXZYBWWCIBWatFYrAZZYKwGWVFYiAVlhhFssWisyxbCMxdZaaNUfRUBZj0Ep7N2imJQ1Kd8oYocwscwt9RLcXRRhgmc12j7W9xUajSQNUXRmc+YrWvYAb/eJoV7Z4m9yKZHLKQPgbznlz4RNNxhMvQDBInL4DtrTbSuhT+tPPXxG8fGdLh8QlRc9NgynipuP9JvHkxy8SzOMx5YVgFY4iCRN2hJWAVjysErKK5WCRHlYBEKSRAIjiIJEKSRItGESLQPemSLZZZYRTLPFbdK7LFlZYYRbCLKIKxbLLDCAwlspXKxGIdUVnc2RFLMx3KoFyT4S2RK+Lw61Eam6hkqKyOp1DKwsQfCLKeQYn7Wqvek08PTNAFgAxYVCt/NJINgbdDNP2n+0XE4pe7pDyekR5wpMWqP7algQOgA63ju3vYJ8CTiMPd8GT+Z8Pf8L805N4HmeLS19f8At16zhlll4l0iILCyJua+zaVM2eoWI32Nh7hug0fJlYXXML67z8zJEFtRedD2R7W1MA+X08M7XqUuIO7Mh4Nu6GaCrTK8NL2B5zMPRaowRBd2NlA3kyRMxPZXc9nif4nTrKQq16lSuUrkUKi0qxe1g9u8BUqRlv8ACerFZ4pg8Y+FcYRn7ygcp7uqBUod4fSCo4KjXc1gZ2GztoGkAaFQ01tpSq58RhLcgCTVpe1Wf8s7YZ15c8sXbssArKGztuLUZadRe7qvfuxmD0q+X0u5qjRrcVNmHFRNoyztGUT4YpXIi2WWCsWyzVorssWywsbiUopnqNZbgDeSzHcqgasx4Aamc5tDbTnS5or6ihamMP5r+ZQ4izZnHFRJOcQsY2nto+XCkXQFmXR3WnmA10vv1A0nHHbj4HD+TojCtVPfCpURkUI4GqKwu2oNiRbSWdpbVNK7Uhkfca5JqYpjb+e3nKeP3eQdJzu08G4AxBJYVfOdmOZhUOpzHjfnPPnyTdw6Y49muZySSxJJJJJ1JJ3kmZIFzLdEKqnOvnMdN1wB8pyhtWtHYHHVKD56TFTx9VhyI3ERhSmeY98rvTHA3jx3R0tTtrVKgLSQPbViWIvzC8PeZvuze2/KgwYBaiEGy3sUO4i/X9pwGEwj1XFOmpZm3AfM8hPROz2wFwq5ic1ZhZ34Ab8q9N2vGejizzyy/TnnGMQ2loJEdaCRPXbkQVgER5WARFhBEAiPYRZEthREG0aRBMWr34pFlZYaLafO2eilZli2EsmKYRsUrMsWVllhFkS7JSuVgFY9hFNLZRFSmCCCAQQQQdQQd4I4iePdvvs+NAtisEuahq1WgNWo82TmnTeOo3exVOkUBziakp8z0MFUrtairVHCM5VBmbIguTboP2lK8+jtndnKGGxFXE0UyviFUOBbItiSSo/DmJFxu80TiO3/ANn5qscVgUHeMb1qAsoYne6XsAeY479+/nOK28sosSQAbHcf6hNvhGWi9xTAqAlS9yLIws1gNAbbiOZ05GnYvaF9MJUuDcXy2+Jm/HZLG1sgqYYpUbzSzFTTsBvYqTl8ZcRyO3mzMH53m82DtLOnnHUaN0PPx+d5tcZ9mmLdQAaAykWBdt27gkv7J+yvKCa+JYOQLDDeaqnqzC7e4S97JUPLCgzpZspR2pNbJXCG+Rgdx32bepNwQZ6DsvEiomjZ8uWz8alJlD0nNtxZGU+M4nHfZ9iqWtDFJUUa5a65Gt+bW5902PYDFk0xSbRqJfDMCb+b/wAagT7Veqo6UhN4z37szHZ15EBhGtEVycpy2zGypfQGoxCoPeROts047tZtIh0po2ViGqM4811pBjTVVbeudlqlrb1ROBIPMtVAFhboBujxs6ttLE1quHdEo58tN6mrNhqYFKkQupJtT1vbWban9nq2+9xNV2IPoWpoDw803nG5nvTVRDzzaWJ7xwB6INh1udT4/SbnFVh5OtMgHMwDC5ByAX05a216TZP9nNdagK1qbIDclgyNp/SAfnLNXsfXXzjlYAjzaZJY+BAmKy9NXDkcTQyIH9FWOgHEcuZ8Zrma5v8ADkJ1e1uz+NqN/wCXORNEAamfHRpWwPZHFVHCvS7tb+c7lbKOdgbkyayXDTYXBu4ZlUlaYBqMBcICbC8tYDZz13FKkt23sToqjmx4D/YnqOC2VSo0e4RfuyCGvqXuLMWPEmDsvZdPDUxTpjT8THV3bmx4zrHEzup7F2KmFTKurt/xKhGrHkOS9JscsaRBInoioioc5KKwCI4iARLaUSRAIjSIJEtpRREWwjjFtLZRREAwyYNjFlPfnqHkIpn6fGVHxq84HfXnyre7VYZxyMWXESX6xNSrbjLsmqwWHOKZxzldsT7PfEPiBLsmq01WJareV++Ew17bpdjU3WCV6xRxEgYgGXZNTssgrA7yQXl2NRESCIBqWi3xEuyammLYzmtu9tsLhGNOpUvUG+nTBdl468AdRoTOe/8AFCk7ZKeHck3sXZUGmvC8sSy7zGn7t/yP8jPLtj4tMI9Gqzfd4vC4UjQsFxdDul1tu+6qOv8AfNnX7cVnBC4ZbEEXLu2/Tgs4OvtKpVRMCVVVpNe+U5wQgRiSTuIUG1uUs3FJ2e6swnP9strrhcMxuRUqJVFELqxqZcikcsrVFa/9InNYbthXo01pCmrCmqoHdizsALXY21M57tNtSpWqpjGAzUsgFO5emMrZhppa5366zWV1KW7LslgRQxDUBa9LCUUe38zO5f8AxE++dXaeX7D7U1hUqYnuVZqwCv6armDMxI38wPCbmp9oBQZqmH3Wvlqa8txWI8Eu1aLYzkMP9omGf01qU+pAcf4Tf4TpMJikrIKlJg6NuZd3X2HpLGRRzNFExhSQVl2KJMEiNNoBMuyUXlkFYZMEmWygGA0JmiyZbSgMsAiMJgMZbKLYRbCGziAanSLSg5ZGWQzmAWMtlPVxs485JwxXj8Y9dorwI+EGriQeInxtpfU0hRxDvuvKLVW5mbBkB4j3xT0l5DwM3GbM4Na2LI3m0r1MVf8AH4S3jMKrbgbTXPgOW6dIyhmcThiWHH4yPLG5waOzSecuU9mAbyfZLtDOqt5UTxjBiD60s/w9eEwbO6xtBqT5UwkeVGWf4fJGCtvjaE1Ve+J4znu2naLyKhdD9/VutLjl5uRyFx4kTq6mGRBmc5V5k2E8W7UCticZ31elUXDlwqLpmFBToBrvOpPVpqO7OUT+Edmdid9fE4gFs5JQPrnN9Xbnc339TMftEyYgJhgiouZQwUEmwOvICbHHbbz0GpUKZpkqKampZQq7tLX4aTmcPsxgykGncC3pG5PE7uRImoticZbqt2jxFiTWIA1Ngo+Qmow1VqjNXqG71L6nfa+8/D3R2I2Y7C2ZAL+dqxuOXoxYY5u7AGmgIPmn2XE6zPfuxrl6PNWBUbMCp3EWMPyap6v+/dFVqbILsNPbb9pq00y9I2ZtStRBpLUZQp0AtYiw4Hw98tYvtFiBTN3DDTRlXn0EophjVs65VIuLMWvbrYQsVgGy/gtcX1b6TH4XWb8NtgxSxtI50UVF81iujKTuYHl0PIyv2a2u+z8UaNUnuXIFT1R6tUfv09glLZZehVzjIVIyuqsdV01146Xh7dxSYgKURxVU2BbLZlPC9+e7xmPDWs+nrga8wzmuxONqdx3NdSr0rLTLfjp/hA6jd7LToWqTXcoTRTNF1K4G8jxiGxa85bSlhmi2eVWxggNivCaSlkmASZUOOgHHS2UuEdYBWVDjYBxRi0pbJEWWErHEQfKJbKPZxFlok1YOeW0p6OcC/I/GQ2EYc51HeLMJUz4nVl9jWHHvTccTEO78zOzelTPKVqmDQ7iJuOZJ43J98/OOo4gjeLzfts5OkA4Gn/szfVhjpqlHHH1NOkeMYOKwmwicGI8Yp8Fyc/OTaDQ5MWohLjKfrCUTgm4EeIgHDN/SZeyUX2l2z3VO1I+cwPnDgOnWeYPtCoWINRrhjrc6zv8AbWAqVUVqVJ6ilf8Ako1SxG/Nl9HxtOF2jsusjXbDYkc/uKh+QM9PHlrFQ1lGERHeDcNtOsu6oT/df4NHVcSag87MpPFNB+k3T4TSliu9Ko/NRqj/AKYSY0DiR7VcfMTtHIxWHuG2bC6ZqZINvOtpfwEXhGCm7XLcLnT/ALzXjbKLvqLf81jC/jVI73Q+0qY2i7hfr7bZsQD+EeIAlahhqatnYAm9wPwj6yn/ABmh61P3rM/jFD1k94+s1vEs1HtvTtCVMbUSquVx7DxE1v8AF6HrJ7x9YJ2vQ9ZPePrNTyWlYm4eiKdwAGBN76X9xhV6ilSCLC28eaR7CJVO16PrJ7xAba9Lmn+GZ2iqSYhVoYKpUJClsvUnUdZeo4AU/R0IGu7U9Ta/gDENtpBudR7CIo7SzbiT+UFvlMRMQkzDaHE1VFlfKOm/9TXPxlSpiXvc1nP9zfWUjWZty1D7Kbn9oaYSs/o4fEN+WhVP/TLv+2fq2uy9qHNlclkPrG5XqDwM2Ve6sQTe248wdQfdNZhOz2M0IwWJtzFFz8hNpiqLKQji1RFCutwSu8i9txsd28S7W55xH4J72C1QmQZEW5MzSLyCpgES2GZ5HeGK1kExaGmoYBvALGRcwDIPODlPOATBJgerLjzGjHniJzfeP63wEzvqnrfATw9GH0P5DpWx6nnEnGDmfjOeNep63wEg16nrfARHAT8h0Xl1vxfOQcdfiPjOd76p63wEE1qnrfAS9FnrugOKHSAcaB/oTNCa1T1vgJHev63wEvRZnnbxseeZ98OnjW9YeM58u/rH4RWIrOqM2bcrHcOAM10k6zebW7NUsYhLZldfNFRPS03E+/63tOE2hsPFYZstLaFYKNw72qrD3ECembC2oKtMg+ZUYaHeCR85ze0+0GHzmliWoMyki6ut/gdD0nDiyynxL63yODhmZnOK/biKmN2kp02lidP/AHFa3+cyV2/tNf8A1Fz+eo7/AOZTN1jTs99VxCqeRYETncbSoD0MRTPsM9MT7fNy4MI8f6VtXFYrFFWxOJSoyAhCfNKg2vuQX3CUfIX9en+r/SDVcDc4PsMV33Wbhz6WC7Rw7qGBFFsylQWYXQkEZhpe4vcajUDfuh1KRY/8KiBkVLLUynMDfPccTuMoiv1hCt1g6WC33T5VUU6F1KnMWBLWvv53vrc200tMqU3If7rDg1FQAowHdld5UG9ieMqit1k9/wBZTo4LKIwYHucOVAUZcxsQpY+lmvc3FzxyjreqNm1fWT9Yk+UdZPlHX4wdLBn8NqcXp/q+gm/HaDaVso2gFA0AXzbDh6NKaJa4P4h4mXcJSpN6demvtaKWOHGVurtjaTaHalb+ytXX5ASPKsY/p7TxP/2V3+dSbLCYHAjWpjaXsDXMtNitn0h5jo55s4+URjbrHxcPMzH9tOMCp86o9XENvBxDFqYPPISbn2kjpLuy3ADKdwtYR2Ix6shqApk3AUyG162mnwGILOQNPNJ+Im9a7Mc2OOGP1b5isHvBKJLc/lAJbn8pNXj3XXeKLdZWJbnBJbnLSbLBaDmlc5ucg35y0lnlhBvEa85Fjziizy0EtE2PORY84ot6HaZaGRItONO1lkQWEMyGiksoiQRCMiapLBaZaHMiksJWVdpL9zVI/lVP8ply0Ti0zU3X1kce9TLRbnu1O2DQwndobPXOUEaEJ+Ij3geM4ClZFzsASTlpq27T0mPMDQW535To9v7PxFdKFbJlo+TU2zXV8t97FUJIvvta9rX6c/i6YDb/ALtQFQi9iPbwN73HOcePDWHf5XPPLlHqIqAJUJ4L4JT/APzDv0X9KfSQrjmPef3mZxzE6PKw35D9KfSDfov6V+knMOYkZhzgYw6D9K/SbHZGyPKkqqhUV8PRqYgIRrXpoAWVQPxBczf29Zriw5y1sjajYTEUsVTN3o1FfKdzr+JD0IuD7YFRQOQ90vbJ2V5QarXVKWFoPiKzkG2VbBUH9TMVUe3pB23RpjE1fJbthjUZqB3EUm1UHqL28JafHpS2f5Kh++xWI73FnlRpC1Cn1uzVGPsWFae9zcAAcBYbvGTfoP0r9JFxzmZhzhGXPIfpX6Sb9B+lfpIzdZmYc4GFug/Sv0gFuBtboACPdDzDmIDEHj8zAbgaxR7HcdDynT7GH3p/+M/5lnLU8Oz2yatyF72HwnWbCoMtQhxY9xSOhVr5i3EE8t3SaxdN/pq2pWAVjysAidHIkrBKxxEEiAopIKxpEgiVCcsjLGkSCICssjLG2kWgehFYBWOyyLTg62QUkFI+0jLBasacjJLJWCVlRXyTMkflkZZUVykjLHlYNoHj23KNTC16lIEgZjl/KToV5aW1E1nlL+u36jN5242ma+LZNMlAmklhxHpEnjqD7pz0xIs0FLhjc+YhYm/UAX8SIjvDzh06pCMoJs+W44GxvrFQLOCAZwrkhSdSAL7jzHsm28gw/wDMfl+Df7poVOun0jRUPU+MWNv5Fh/5jcvwfSR5DQ9d/cv0mrFQ8/fM70+sLcrRY2j4Chvzv4Kp/aQcHh/5jeIX6TVZuomePzixtPJMP/MbXd6P0meR0P5je5fpNWq8pFukWL2KoUVUlGYtpvC2368JrsxhMdIuLDaALG2vosdOgv8AtAzHmYeGezAg2tfUb91osyAlqkcffr852PZHDFaTVG31WFr7yq8feTOLnf8AZ7HGtQBb0kJRrCwNt2nsIm8PKS2BgkQzBM7MgIkGEYJgCZBkmCTAyCZN5BgQZEkyIHoeaQWmTJxbRnkZ5kyWgOeRmmTIpEFpF5kyUCTBLceWsyZA8Ux1ElmdvSdme3tN5RmTJzVMiZMkErCJkzIEAnp8JHu9wkzIETL8ZkyBl5haZMgQZEyZAkSJkyBKidX2NNhUT8rD4g/tJmTeHlJdGYJmTJ3YAYJmTIAmDJmQBkGZMgCZEyZA/9k="
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ backgroundColor: "#DDD", padding: 0.5 }}
        >
          {tripType}
        </Typography>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>Travel Type</Typography>
          <Typography>{travelType}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>Fee</Typography>
          <Typography>${totalTripFeeInDollars}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>Status</Typography>
          <Typography>{bookingStatus}</Typography>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <MdExpandMore />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Field label={"Full Name"} value={passengerFullName} />
          <Field label={"suitases"} value={numberOfSuitcases} />
          <Field label={"Num. Of Passengers"} value={numberOfPassengers} />
          {travelType === "Airport" && (
            <>
              <Field label={"Accom. Addr."} value={accommodationAddress} />
              <Field label={"Airline"} value={airline} />
              <Field label={"Flight Number"} value={arrivalFlightNumber} />
            </>
          )}
          {(travelType === "Airport" || travelType === "Point To Point") && (
            <>
              <Field
                label={"Distance"}
                value={distanceInMiles.toFixed(2) + " mile"}
              />
            </>
          )}
          {travelType === "hourly" && (
            <>
              <Field label={"Occasion"} value={occasion} />
            </>
          )}
          <Field label={"Pickup DateTime"} value={pickupDateTime} />
          <Field label={"age"} value={34} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
