import React, { Component } from 'react';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class ArticleModal extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
      // date_published,
      share_link,
      summary
    } = this.props.article;

    let date_published = new Date(this.props.article.date_published);
    date_published = date_published.toGMTString();



    if (this.state.modalIsOpen) {
      return (
        <div>
        <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        >

        <div className="article-description-modal">
          <h3>{headline}</h3>
          <img src={ image }></img>
          <p>{ summary }</p>
          <div className="author-publish-info">
            <span>Published { byline }</span>
            <span>on { date_published }.</span>
            <span>
              For more information, please visit
              <a href={ share_link }>{ headline }</a>
            </span>
          </div>
        </div>
        </Modal>
        </div>
      );
    } else {
      return <div onClick={ this.openModal } className="article-description">
        <h3>{headline}</h3>
        <img src={ image }></img>
      </div>;
    }
  }
}

export default ArticleModal;
