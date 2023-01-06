-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "date" TEXT DEFAULT now(),
    "title" TEXT,
    "tags" TEXT,
    "body" TEXT,
    "url" TEXT DEFAULT uuid_generate_v4(),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tagmap" (
    "postid" INTEGER NOT NULL,
    "tagid" INTEGER NOT NULL,

    CONSTRAINT "tagmap_pkey" PRIMARY KEY ("postid","tagid")
);

-- CreateTable
CREATE TABLE "tagmap2" (
    "postid" INTEGER,
    "tagid" INTEGER,
    "id" SERIAL NOT NULL,

    CONSTRAINT "tagmap2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_url_key" ON "posts"("url");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- AddForeignKey
ALTER TABLE "tagmap" ADD CONSTRAINT "tagmap_postid_fkey1" FOREIGN KEY ("postid") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tagmap" ADD CONSTRAINT "tagmap_tagid_fkey1" FOREIGN KEY ("tagid") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tagmap2" ADD CONSTRAINT "tagmap_postid_fkey" FOREIGN KEY ("postid") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tagmap2" ADD CONSTRAINT "tagmap_tagid_fkey" FOREIGN KEY ("tagid") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

