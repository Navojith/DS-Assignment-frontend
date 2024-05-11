import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomSelect from '../../components/CourseContent/CustomSelect';
import PageContainer from '../../components/PageContainer/PageContainer';
import storage from '../../firebaseConfig';
import {
  createContent,
  deleteContent,
  getCourse,
  getCourseContentByStep,
  updateContent,
} from '../../services/courseManagementService';
import { CourseContentDTO, CourseDTO } from '../../types/courseTypes';

const Index = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState<CourseDTO | null>(null);
  const [courseContent, setCourseContent] = useState<CourseContentDTO[]>([]);

  const [selectedChapter, setSelectedChapter] = useState<string>('1');
  const [selectedContentType, setSelectedContentType] =
    useState<string>('Text');
  const [content, setContent] = useState<string>('');

  const [file, setFile] = useState<File | undefined>(undefined);
  const [percent, setPercent] = useState(0);
  const [pageType, setPageType] = useState<'ADD' | 'UPDATE'>('ADD');

  const chapterOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const contentTypeOptions = ['Text', 'Image', 'Video'];

  const [loading, setLoading] = useState(false);

  const handleUpload = useCallback(() => {
    if (!file) {
      return;
    }
    setLoading(true);

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setContent(url);
        });
      }
    );
    setLoading(false);
  }, [file]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFile(event.target.files?.[0]);
  };

  const handleSave = () => {
    if (!content) {
      return;
    }
    setLoading(true);
    const payload: CourseContentDTO = {
      courseId: id,
      step: selectedChapter,
      contentType: selectedContentType,
      content,
    };
    const response =
      pageType === 'ADD' ? createContent(payload) : updateContent(payload);
    if (response) {
      setPageType('UPDATE');
      console.log('Content saved successfully');
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleDelete = () => {
    setLoading(true);
    const response = deleteContent(id, selectedChapter, selectedContentType);
    if (response) {
      setPageType('ADD');
      setContent('');
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    handleUpload();
  }, [file, handleUpload]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCourse(id);
      if (response) {
        setCourseData(response);
      }
    };

    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCourseContentByStep(id, selectedChapter);
      if (response) {
        setCourseContent(response);
        setFile(undefined);
      } else {
        setCourseContent([]);
        setContent('');
      }
    };

    fetchData();
  }, [selectedChapter, pageType]);

  useEffect(() => {
    const selectedContentTypeData = courseContent.filter(
      (content) => content.contentType === selectedContentType
    );

    if (selectedContentTypeData.length > 0) {
      setPageType('UPDATE');
      setContent(selectedContentTypeData[0].content);
      setPercent(100);
    } else {
      setPageType('ADD');
      setContent('');
      setPercent(0);
    }
  }, [courseContent, selectedContentType]);

  return (
    <PageContainer>
      <div className="h-[80vh] justify-center place-content-center text-center">
        <div className="bg-primaryLighter p-5 rounded-md border-2 border-secondary h-2/3 flex flex-col justify-between">
          <div className="text-2xl font-bold mb-5">
            Course Content of {courseData?.name}
          </div>
          <div className="flex gap-10 justify-center">
            <CustomSelect
              prompt="Select Chapter"
              options={chapterOptions}
              setSelected={setSelectedChapter}
            />
            <CustomSelect
              prompt="Select Content Type"
              options={contentTypeOptions}
              setSelected={setSelectedContentType}
            />
          </div>
          <div className="h-1/2 w-full flex flex-col items-center justify-center gap-6 text-slate-700">
            {selectedContentType === 'Text' ? (
              <textarea
                className="textarea textarea-secondary w-full textarea-lg"
                placeholder="Description of the course"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            ) : percent > 0 && percent < 100 ? (
              <div
                className="radial-progress text-secondary"
                style={{ '--value': percent } as React.CSSProperties}
                role="progressbar"
              >
                {percent}%
              </div>
            ) : content || percent == 100 ? (
              <label className="input input-secondary flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  value={file?.name ?? content}
                  readOnly
                />
              </label>
            ) : (
              <input
                type="file"
                className="file-input file-input-bordered file-input-secondary text-slate-700 w-full max-w-xs"
                onChange={handleFileChange}
              />
            )}
            <div className="flex gap-10">
              {loading && (
                <span className="loading loading-dots loading-lg text-secondary"></span>
              )}

              {!loading && (
                <button className="btn btn-secondary" onClick={handleSave}>
                  {pageType === 'ADD' ? 'Save' : 'Update'}
                </button>
              )}

              {!loading && pageType === 'UPDATE' && (
                <button className="btn btn-error" onClick={handleDelete}>
                  Delete Content
                </button>
              )}

              {!loading && selectedContentType !== 'Text' && (
                <button
                  className="btn btn-info"
                  onClick={() => {
                    setContent('');
                    setPercent(0);
                  }}
                >
                  New File
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
