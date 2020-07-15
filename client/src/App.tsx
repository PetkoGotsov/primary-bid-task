import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
    state = {
        urlList: [],
        url: '',
        responseToPost: '',
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ urlList: res }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/url/api/urls');
        const body = await response.text();
        const urls = JSON.parse(body);

        if (response.status !== 200) {
            this.setState({
                responseToPost: body
            });
            return;
        }

        return urls;
    };

    handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const response = await fetch('/url/api/urls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: this.state.url }),
        });
        const body = await response.text();

        if (response.status !== 200) {
            this.setState({
                responseToPost: body
            });
        }
        else {
            this.setState({
                responseToPost: 'Success',
                urlList: JSON.parse(body)
            });
        }
    };

    listUrls = () =>
        this.state.urlList.length > 0 ?
            this.state.urlList.map(url => (
            <div className="card">
                    <h2>{url ? <a href={url} target="_blank">{url}</a> : ''}</h2>
            </div>
        )) : '';

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            <strong>Post Url to Server:</strong>
                        </p>
                        <input
                            type="text"
                            placeholder="Enter URL starting with http:// or https://"
                            value={this.state.url}
                            onChange={e => this.setState({ url: e.target.value })}
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <p>{this.state.responseToPost}</p>
                    <h1>Existing domains</h1>
                    <div className="urlList">
                        {this.listUrls()}
                    </div>
                </header>
            </div>
        );
    }
}

export default App;