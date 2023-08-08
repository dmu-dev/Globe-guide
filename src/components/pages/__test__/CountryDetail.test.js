import { render,screen } from "@testing-library/react";
import {BrowserRouter} from 'react-router-dom';
import getCountryList from "../__mocks__/getCountryList";
import CountryDetails from "../CountryDetails";
import { act } from "react-dom/test-utils";


describe("Country Details should be present", ()=>{
  
    it("should have single country detail", async() => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce(
            {
            json: async()=> getCountryList.body
        }
        )
        await act(async ()=>{
            render(<CountryDetails></CountryDetails>, {wrapper: BrowserRouter})
        })
        const images = await screen.findAllByRole("img")
        expect(images).toHaveLength(2);
    })

    it("should have single country detail", async() => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce(
            {
            json: async()=> getCountryList.body
        }
        )
        await act(async ()=>{
            render(<CountryDetails></CountryDetails>, {wrapper: BrowserRouter})
        })
        const commonname = await screen.queryByTestId("commonname-value")
        expect(commonname).toBeInTheDocument()
        const officialname = await screen.queryByTestId("officialname-heading")
        expect(officialname).toBeInTheDocument();
        const officialnamevalue = await screen.queryByTestId("officialname-value")
        expect(officialnamevalue).toBeInTheDocument()
        const capital = await screen.queryByTestId("capital-heading")
        expect(capital).toBeInTheDocument()
        const capitalvalue = await screen.queryByTestId("capital-value")
        expect(capitalvalue).toBeInTheDocument()
        const continent = await screen.queryByTestId("continent-heading")
        expect(continent).toBeInTheDocument()
        const continentvalue = await screen.queryByTestId("continent-value")
        expect(continentvalue).toBeInTheDocument()
        const language = await screen.queryByTestId("language-heading")
        expect(language).toBeInTheDocument()
        const languagevalue = await screen.queryByTestId("language-value")
        expect(languagevalue).toBeInTheDocument()
        const currency = await screen.queryByTestId("currency-heading")
        expect(currency).toBeInTheDocument()
        const currencyvalue = await screen.queryByTestId("currency-value")
        expect(currencyvalue).toBeInTheDocument()
        const timezone = await screen.queryByTestId("timezone-heading")
        expect(timezone).toBeInTheDocument()
        const timezonevalue = await screen.queryByTestId("timezone-value")
        expect(timezonevalue).toBeInTheDocument()
    })
})