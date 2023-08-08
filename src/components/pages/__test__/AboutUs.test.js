import { render,screen } from "@testing-library/react";
import {BrowserRouter} from 'react-router-dom'
import AboutUs from "../AboutUs";

describe("AboutUs should be present", ()=>{
    it("should have the welcome para element", () => {
        render(<AboutUs></AboutUs> ,{wrapper: BrowserRouter})
        const paraone = screen.getByText("Welcome to our website!",{exact:false})
        expect(paraone).toBeInTheDocument();
        const paratwo = screen.getByText("Our platform offers",{exact:false})
        expect(paratwo).toBeInTheDocument();
        const parathree = screen.getByText("When you visit a country's",{exact:false})
        expect(parathree).toBeInTheDocument();
    })

    it("should have the benifits para element", () => {
        render(<AboutUs></AboutUs> ,{wrapper: BrowserRouter})
        const paraone = screen.getByText("By providing these details",{exact:false})
        expect(paraone).toBeInTheDocument();
        const paratwo = screen.getByText("We believe that learning",{exact:false})
        expect(paratwo).toBeInTheDocument();
        const parathree = screen.getByText("Start exploring our",{exact:false})
        expect(parathree).toBeInTheDocument();
    })

    it("page should have two images", ()=>{
        render (<AboutUs></AboutUs> ,{wrapper: BrowserRouter})
        const images=screen.getAllByRole('img');
        expect(images).toHaveLength(2)
    })

    it("page should start Exploring Button", ()=>{
        render (<AboutUs></AboutUs> ,{wrapper: BrowserRouter})
        const button=screen.getByRole('button');
        expect(button).toBeInTheDocument()
    })
})