import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './NewPost.css'
import { getRandomPrompt } from '../utils';
import { Field, Loader } from '../Components/ComponentHandle';
import preview from '../assets/previews.png'

const NewPost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="New_Post_max-width-container mx-auto">
      <div>
        <h1 className="New_Post_main-heading">Create</h1>
        <p className="New_Post_sub-text">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>

      <form className="New_Post_form-container" onSubmit={handleSubmit}>
        <div className="New_Post_flex-container">
          <Field
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <Field
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="New_Post_image-wrapper">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="New_Post_full-image"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="New_Post_preview-image"
              />
            )}

            {generatingImg && (
              <div className="New_Post_loader-overlay">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="New_Post_button-group">
          <button
            type="button"
            onClick={generateImage}
            className="New_Post_generate-button"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="New_Post_share-container">
          <p className="New_Post_share-text">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="New_Post_share-button"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
}
export default NewPost;