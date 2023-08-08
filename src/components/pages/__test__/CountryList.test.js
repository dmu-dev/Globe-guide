import { fireEvent, render,screen,waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import CountryList from "../CountryList";
import { act } from "react-dom/test-utils";
import getCountryList from "../__mocks__/getCountryList";
import getMultipleCountry from "../__mocks__/getMultipleCountry";
import {BrowserRouter} from 'react-router-dom'

describe("Showcase details should be present", ()=>{
    it("should have the h2 element", () => {
        render(<CountryList></CountryList>)
        const element = screen.getByTestId("main-heading")
        expect(element).toBeInTheDocument();
    })

    it("should have the h3 element", () => {
        render(<CountryList></CountryList>)
        const element = screen.getByTestId("sub-heading")
        expect(element).toBeInTheDocument();
    })

    it("should not have the search bar before the api renders", async () => {
        render(<CountryList></CountryList>)
        const element = await screen.queryByTestId("searchbar")
        expect(element).not.toBeInTheDocument();
    })

    it("should have the search bar", async() => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce(
            {
            json: async()=> getCountryList.body
        }
        )
        await act(async ()=>{
            render(<CountryList></CountryList>, {wrapper: BrowserRouter})
        })
        const element = await screen.findByTestId("searchbar")
        expect(element).toBeInTheDocument();
    })
})

describe("Search should work", ()=>{
    it("should have input element", async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce(
            {
            json: async()=> getCountryList.body
        }
        )
        await act(async ()=>{
            render(<CountryList></CountryList>, {wrapper: BrowserRouter})
        })
        const element = screen.getByTestId("input")
        expect(element).toBeInTheDocument();
    })

    it("on searching should get dropdown element", async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce(
            {
            json: async()=> getCountryList.body
        }
        )
        await act(async ()=>{
            render(<CountryList></CountryList>, {wrapper: BrowserRouter})
        })
        const element = screen.getByTestId("input")
        expect(element).toBeInTheDocument();
        userEvent.type(element,"Amer");
        
        const dropdown= screen.findByTestId("dropdown");
        expect(dropdown).toBeInTheDocument
    })

    it("should have a mousedown event on dropdown element", async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce(
            {
            json: async()=> getMultipleCountry.body
        }
        )
        await act(async ()=>{
            render(<CountryList></CountryList>, {wrapper: BrowserRouter})
        })
        const element = screen.getByTestId("input")
        expect(element).toBeInTheDocument();
        userEvent.type(element,"American Samoas");
        
        const dropdown= screen.findByTestId("dropdown");
        expect(dropdown).toBeInTheDocument

        // waitFor(()=>{userEvent.keyboard(dropdown,{keyboardState:'enter'})})
        waitFor(()=>{userEvent.click(dropdown)})
    })

    // it("should have a keyboard event on dropdown element", async () => {
    //     window.fetch = jest.fn();
    //     window.fetch.mockResolvedValueOnce(
    //         {
    //         json: async()=> getMultipleCountry.body
    //     }
    //     )
    //     await act(async ()=>{
    //         render(<CountryList></CountryList>, {wrapper: BrowserRouter})
    //     })
    //     const element = screen.getByTestId("input-wrapper")
    //     expect(element).toBeInTheDocument();

    //     const inputelement = screen.getByTestId("input")
    //     expect(inputelement).toBeInTheDocument();

    //     userEvent.type(element,"Amer");
        
    //     const dropdown= screen.findByTestId("dropdown");
    //     expect(dropdown).toBeInTheDocument
         

    //     userEvent.keyboard( screen.findByTestId("dropdown"),{keyboardState:'arrowdown'})
    //     userEvent.keyboard( screen.findByTestId("dropdown"),{keyboardState:'enter'})
    //     // userEvent.selectOptions( screen.findByTestId("dropdown"),"test string")
    //     expect(waitFor( ()=>{screen.findAllByTestId("1")})).toBeInTheDocument()
    
    //  //   const dropdownelement=await screen.findByTestId("1");
    //     // console.log(dropdownelement);
    //     // userEvent.keyboard(screen.findByTestId("dropdown"),{keyboardState:'arrowdown'})
    //     //expect(await screen.findByTestId("1")).toBeInTheDocument();
    //     // userEvent.keyboard(dropdown,{keyboardState:'arrowup'})
    //     // userEvent.keyboard(dropdown,{keyboardState:'enter'})
    //     // userEvent.keyboard(dropdown,{keyboardState:'escape'})
    // })
})

describe("Country list should be present", ()=>{
    it("should have the h1 element", () => {
        render(<CountryList></CountryList>)
        const element = screen.getByText("Countries")
        expect(element).toBeInTheDocument();
    })

    it("should have the country", async() => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce(
            {
            json: async()=> getCountryList.body
        }
        )
        await act(async ()=>{
            render(<CountryList></CountryList>, {wrapper: BrowserRouter})
        })
        const element = await screen.findByRole("img")
        expect(element).toBeInTheDocument();

        const paraelement = await screen.findByText("American Samoa")
        expect(paraelement).toBeInTheDocument();
    })

    it("should have Load More Button", () => {
        render(<CountryList></CountryList>)
        const element = screen.getByRole("button")
        expect(element).toBeInTheDocument();
    })

    it("function must be called on a load More Button", async () => {
        await act(async ()=>{
            render(<CountryList></CountryList>)
        })
        const loadMoreButton = screen.getByRole("button")
        userEvent.click(loadMoreButton);
    })

    it("Load More button should not be present if the no.of records are less than 8", async () => {
        await act(async ()=>{
            render(<CountryList></CountryList>)
        })
        const loadMoreButton = await screen.findByRole("button")
        userEvent.click(loadMoreButton);
        const Button = await screen.findByRole("button")
        expect(Button).not.toBeInTheDocument()
    })

    it("Load More button should  be present if the no.of records are more than 8", async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce(
            {
            json: async()=> getMultipleCountry.body
        }
        )
        await act(async ()=>{
            render(<CountryList></CountryList>, {wrapper: BrowserRouter})
        })
        const loadMoreButton = await screen.findByRole("button")
        userEvent.click(loadMoreButton);
        const Button = await screen.findByRole("button")
        expect(Button).toBeInTheDocument()
    })

    it("Country list length should be greter than 1", async()=>{
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce(
            {
            json: async()=> getMultipleCountry.body
        }
        )
        await act(async ()=>{
            render(<CountryList></CountryList>, {wrapper: BrowserRouter})
        })
        const images = await screen.findAllByRole("img")
        expect(images).toHaveLength(8);
    })
})