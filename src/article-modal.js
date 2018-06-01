import React, { Component } from 'react';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class ArticleModal extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      secondModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.blockView = this.blockView.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.timer === 0) {
      this.blockView();
    }
  }

  blockView() {
    this.setState({secondModal: true});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const {
      headline,
      image,
      byline,
      share_link,
      summary
    } = this.props.article;

    let date_published = new Date(this.props.article.date_published);
    date_published = date_published.toGMTString();



    if (this.state.modalIsOpen) {
      let pleaseSubscribe = "";
      if (this.state.secondModal && this.props.timer === 0) {
        pleaseSubscribe = <div className="subscribe-modal">
          <div className="subscribe-container">
            <div onClick={ this.closeModal } className="close-modal">X</div>
            <div className="subscribe-info">
              <p>
                Thank you for using Wall Street Journel. For more amazing
                content please subscribe.
              </p>
              <a href="https://store.wsj.com/v2/shop/US/US/wsjusmemorial18?inttrackingCode=aaqro02c&icid=WSJ_ON_PHP_ACQ_NA&n2IKsaD9=n2IKsaD9&Pg9aWOPT=Pg9aWOPT&Cp5dKJWb=Cp5dKJWb&APCc9OU1=APCc9OU1">Subscribe</a>
            </div>
          </div>
        </div>;
      }
      return (
        <div>
          <Modal
          className="article-modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          >

          { pleaseSubscribe }
          <div className="article-description-modal">
            <h3>{headline}</h3>
            <img src={ image }></img>
            <p>{ summary }</p>
            <div className="author-publish-info">
              <span>Published { byline }</span>
              <span>on { date_published }.</span>
              <p>
                For more information, please visit
                <a href={ share_link }>{ headline }</a>
              </p>
            </div>
          </div>
          </Modal>
        </div>
      );
    // } else if (this.state.modalIsOpen && this.props.timer === 0) {
    //   return(
    //     <div>
    //     <Modal
    //     className="article-modal"
    //     isOpen={this.state.modalIsOpen}
    //     onRequestClose={this.closeModal}
    //     >
    //
    //     <div className="article-description-modal">
    //       <h3>{headline}</h3>
    //       <img src={ image }></img>
    //       <p>{ summary }</p>
    //       <div className="author-publish-info">
    //         <span>Published { byline }</span>
    //         <span>on { date_published }.</span>
    //         <p>
    //           For more information, please visit
    //           <a href={ share_link }>{ headline }</a>
    //         </p>
    //       </div>
    //     </div>
    //     </Modal>
    //     </div>
    //   );
    } else {
      return <div onClick={ this.openModal } className="article-description">
        <h3>{headline}</h3>
        <img src={ image }></img>
      </div>;
    }
  }
}

export default ArticleModal;
