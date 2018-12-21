import React from "react";

const getFetching = url => Component =>
  class GetFetching extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        data: null,
        isLoading: false,
        error: null
      };
    }

    componentDidMount = async () => {
      this.setState({ isLoading: true });

      try {
        const config = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };
        const result = await fetch(url, config);
        if (result.status === 200) {
          this.setState({
            data: await result.json(),
            isLoading: false
          });
        }
      } catch (error) {
        this.setState({
          error,
          isLoading: false
        });
      }
    };

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };

export default getFetching;
