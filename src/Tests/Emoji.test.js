import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import React from 'react'
import App from '../App';

describe('Emoji Tests', () => {
    let emojiYum, input, emojiList, wrongEmoji;

    beforeEach(() => {
        render(<App />);
        emojiYum = screen.getByText(/yum/i)
        input = screen.getByLabelText(/Search Emoji/i)
        emojiList = screen.getAllByText('Click to copy emoji')
        wrongEmoji = screen.getByText(/100/i)
    })

    //Başlık kısmının başarılı bir şekilde render edildiğini kontrol edecek olan test kodu
    //                      test || it
    test("Header Renderlanmalı", () => {
        const header = screen.getByText(/Emoji Search/i)
        expect(header).toBeInTheDocument();
    })

    //Uygulama ilk açıldığında emoji listesinin başarılı bir şekilde render edildiğini kontrol edecek olan test kodu
    it("Emoji Listesi Renderlanmalı", () => {
        expect(emojiList.length).toEqual(20);
    })

    //Bir filtreleme işlemi yapıldığında, emoji listesinin bu filtreye uygun şekilde yeniden render edildiğini kontrol edecek olan test kodu
    test("Filtreleme İşleminde Aratılan Emoji Listesi Renderlanmalı", () => {
        const emojiText = "smile"
        userEvent.type(input, emojiText)
        expect(emojiYum).toBeInTheDocument()
        expect(wrongEmoji).not.toBeInTheDocument()
    })

    //Liste üzerinden herhangi emojiye tıklandığında, ilgili emojinin kopyalandığını kontrol edecek olan test kodu
    it("Emojiye Tıklandığında Kopyalama İşlemi Gerçekleşmeli", () => {
        document.execCommand = jest.fn();
        userEvent.click(emojiYum)
        expect(document.execCommand).toBeCalledWith('copy')
        
        const copyEmoji = window.ClipboardData;
        expect(copyEmoji).toEqual(emojiYum.value)
    })
});